'use client';
import { Container, useToast } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import { useState, createContext, useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import { useCawProvider } from "src/context/WalletConnectContext";
import { useCawNameMinterContract } from "src/hooks";
import { getBlockChainErrMsg } from "src/hooks/contractHelper";
import { PATH_AUTH } from "src/routes/paths";
import FormStepper from "./FormStepper";

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};


type FormValue = 'userName' | 'termsAccepted' | 'isValid' | 'message' | 'onChainValidated' | 'costVerified' | 'costUSD' | 'costETH' | 'costCAW' | 'swapAmount';

// * Create context for the form
export const MintingPageContext = createContext({
    userName: '',
    termsAccepted: false,
    isValid: false,
    isLoading: false,
    minting: false,
    message: '',
    onChainValidated: false,
    costVerified: false,
    costUSD: 0,
    costETH: 0,
    costCAW: 0,
    swapAmount: 0,
    error: '',
    onSetValue: (key: FormValue, value: any) => { },
    onSubmit: (data: any) => { }
});

//* Create a  hook to access the context
export function useMintingPageContext() {
    return useContext(MintingPageContext);
}

export default function RegisterPage() {

    const { t } = useTranslation();
    const { mint, isLoading, minting } = useCawNameMinterContract();
    const { address, connected } = useCawProvider();
    const router = useRouter();
    const [ error, setError ] = useState<string | null>(null);
    const toast = useToast();

    const [ url, setUrl ] = useState<string | null>(null);

    const methods = useForm({
        defaultValues: {
            userName: '',
            termsAccepted: false,
            isValid: false,
            message: '',
            onChainValidated: false,
            costVerified: false,
            costUSD: 0,
            costETH: 0,
            costCAW: 0,
            swapAmount: 0,
        }
    });

    useEffect(() => {

        //When url is set, navigate to the url
        if (url) {
            router.replace(url, { forceOptimisticNavigation: true });
        }

    }, [ router, url ]);

    const { termsAccepted, userName, message, onChainValidated, costVerified, costCAW, costETH, costUSD, swapAmount, isValid } = methods.watch();

    const onSubmit = async (data: any) => {
        try {
            if (!address || !connected) {
                toast({ title: 'Wallet not connected', status: 'error', isClosable: true, });
                return;
            }

            const { userName, termsAccepted, isValid, errorMessage } = data || {};
            if (!termsAccepted) {
                toast({ title: 'Please accept terms and conditions', status: 'error', isClosable: true, });
                return;
            }

            if (!userName) {
                toast({ title: 'Username not set', status: 'error', isClosable: true, });
                return;
            }

            if (!isValid) {
                toast({ title: errorMessage, status: 'error', isClosable: true, });
                return;
            }

            const { receipt } = await mint(userName, address);

            const url = PATH_AUTH.minted.replace('[username]', userName).replace('[tx]', receipt?.transactionHash || 'xxx');
            setUrl(url);
        }
        catch (error: any) {
            const { message, code } = getBlockChainErrMsg(error);
            setError(message ? message + ' : ' + code : 'Something went wrong');
        }
    };

    const handleValueChange = (key: FormValue, value: any) => {
        methods.setValue(key, value);
    }

    return (
        <PageWrapper title={t('minting_page.title')}>
            <Container w="full" maxW={"container.xl"} h="container.lg" p={0}>
                <MintingPageContext.Provider
                    value={{
                        userName,
                        termsAccepted,
                        isValid,
                        isLoading,
                        minting,
                        message,
                        onChainValidated,
                        costVerified,
                        costCAW,
                        costETH,
                        costUSD,
                        error: error || '',
                        swapAmount,
                        onSetValue: handleValueChange,
                        onSubmit,
                    }}
                >
                    <FormProvider {...methods} >
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormStepper
                                isLoading={isLoading}
                                minting={minting}
                                termsAccepted={termsAccepted}
                                userName={userName}
                                error={error}
                                isValid={isValid}
                            />
                        </form>
                    </FormProvider>
                </MintingPageContext.Provider>
            </Container>
        </PageWrapper>
    );
}