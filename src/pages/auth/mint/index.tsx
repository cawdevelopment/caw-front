import { useState, createContext, useContext } from "react";
import { Container } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import { useDappProvider } from "src/context/DAppConnectContext";
import { useCawNameMinterContract, useMintableCAWContract, useETHBalance, useTranslation, useToast } from "src/hooks";
import { getBlockChainErrMsg } from "src/hooks/contracts/helper";
import { PATH_AUTH } from "src/routes/paths";

import FormStepper from "./FormStepper";

const BlockChainOperationInProgressModal = dynamic(() => import("src/components/dialogs/BlockChainOperationInProgressModal"), { ssr: false });

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};


export type FormValue = 'userName' | 'termsAccepted' | 'isValid' | 'message' | 'onChainValidated' | 'costVerified' | 'costUSD' | 'costETH' | 'costCAW' | 'swapAmount' | 'hideBalance';

// * Create context for the form
export const MintingPageContext = createContext({
    userName: '',
    termsAccepted: false,
    isValid: false,
    processing: false,
    message: '',
    onChainValidated: false,
    costVerified: false,
    costUSD: 0,
    costETH: 0,
    costCAW: 0,
    swapAmount: 0,
    error: '',
    hideBalance: false,
    setValue: (key: FormValue, value: any) => { },
    setManyValues: (values: { key: FormValue, value: any }[]) => { },
    submit: () => { }
});

//* Create a  hook to access the context
export function useMintingPageContext() {
    return useContext(MintingPageContext);
}

export default function RegisterPage() {

    const { t } = useTranslation();    
    const { address, connected, chain } = useDappProvider();
    const [ error, setError ] = useState<string | null>(null);
    const [ processing, setProcessing ] = useState(false);
    const [ mintingCawName, setMintingCawName ] = useState(false);
    const [ breakPoint, setBreakPoint ] = useState<string>('');
    const [ txSent, setTxSent ] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const { balance } = useETHBalance({ account: address, chainId: chain?.id || 0, chainName: chain?.name || '' });

    const { initialized: CAWNamesMinterContractInitialized, mint: mintCAWUsername } = useCawNameMinterContract({
        onBeforeSend: () => {
            setTxSent(false);
            setProcessing(true);
            setMintingCawName(true);
            setBreakPoint(t("minting_page.minting_ntf"));
        },
        onTxSent: () => {
            setTxSent(true);
            setMintingCawName(true);
        },
        onTxConfirmed: (tx, rcpt) => {
            const url = PATH_AUTH.minted.replace('[username]', userName).replace('[tx]', rcpt?.transactionHash || 'xxx');
            router.push(url);
        },
        onError: (err) => {
            setProcessing(false);
            setMintingCawName(false);
            const { message, code } = getBlockChainErrMsg(err);
            setError(message ? message + ' : ' + code : 'Something went wrong');
        },
        onCompleted: () => {
            setProcessing(false);
            setMintingCawName(false);
            setTxSent(true);
        }
    });

    const { initialized: mCAWContractInitialized, mint: mintMCAW, approve: aproveMCAW } = useMintableCAWContract({
        onBeforeSend: (method) => {
            setMintingCawName(false);
            setProcessing(true);
            switch (method) {
                case 'mint':
                    setBreakPoint(t("minting_page.minting_mcaw"));
                    break;
                case 'approve':
                    setBreakPoint(t("minting_page.approve_mcaw"));
                    break;
                default:
                    setBreakPoint(method.toLowerCase());
            }
        },
        onTxSent: ({ }) => {
            setTxSent(true);
        },
        onTxConfirmed: ({ method }) => {

            setTxSent(false);
            if (method === 'mint')
                aproveMCAW(address, costCAW);

            if (method === 'approve' && !mintingCawName)
                mintCAWUsername(userName);
        },
        onError: (err) => {
            setProcessing(false);
            const { message, code } = getBlockChainErrMsg(err);
            setError(message ? message + ' : ' + code : 'Something went wrong');
        },
        onCompleted: (method) => {

            if (method === 'approve' && !mintingCawName)
                mintCAWUsername(userName);
        }
    });

    const handleCloseModal = () => {
        setProcessing(false);
        setError(null);
        setTxSent(false);
        toast.closeAll();
    }

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
            hideBalance: false,
        }
    });    

    const { termsAccepted, userName, message, onChainValidated, costVerified, costCAW, costETH, costUSD, swapAmount, isValid, hideBalance } = methods.watch();

    const onSubmit = (data: any) => {
        try {

            toast.closeAll();

            if (!CAWNamesMinterContractInitialized || !mCAWContractInitialized) {
                toast({ title: 'Contracts not initialized', status: 'error', isClosable: true, });
                return;
            }

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

            if (balance <= 0) {
                toast({ title: t('errors.insufficientETH'), status: 'error', isClosable: true, });
                return;
            }

            //* trigger mint mCAW and it will run the other contracts in order.
            mintMCAW(address, costCAW);
        }
        catch (error: any) {
            setProcessing(false);
            const { message, code } = getBlockChainErrMsg(error);
            setError(message ? message + ' : ' + code : 'Something went wrong');
        }
    };

    const handleValueChange = (key: FormValue, value: any) => {
        methods.setValue(key, value);
    }

    const handleSetManyValues = (values: { key: FormValue, value: any }[]) => {

        //* Merge current values with new values
        const newValues = values.reduce((acc, { key, value }) => ({
            ...acc,
            [ key ]: value
        }), methods.getValues());

        //* Set new values
        methods.reset(newValues);
    }

    const handleSubmit = () => {
        // methods.handleSubmit(onSubmit)(methods.getValues() as any);
        methods.handleSubmit(onSubmit)();
    }

    return (
        <PageWrapper title={t('minting_page.title')}>
            <Container w="full" maxW={"container.xl"} p={0}>
                <MintingPageContext.Provider
                    value={{
                        userName,
                        termsAccepted,
                        isValid,
                        processing,
                        message,
                        onChainValidated,
                        costVerified,
                        costCAW,
                        costETH,
                        costUSD,
                        error: error || '',
                        swapAmount,
                        hideBalance,
                        setValue: handleValueChange,
                        setManyValues: handleSetManyValues,
                        submit: handleSubmit,
                    }}
                >
                    <FormProvider {...methods}>
                            <FormStepper
                                processing={processing}
                                termsAccepted={termsAccepted}
                                userName={userName}
                                error={error}
                                isValid={isValid}
                        />
                        <BlockChainOperationInProgressModal
                            processing={processing}
                            txSent={txSent}
                            message={breakPoint}
                            onClose={handleCloseModal}
                        />
                    </FormProvider>
                </MintingPageContext.Provider>
            </Container>
        </PageWrapper>
    );
}