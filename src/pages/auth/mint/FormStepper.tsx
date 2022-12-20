import { useState } from "react";
import { Box, Button, Stack, Text, Flex, useColorModeValue, Link, Spacer, Progress, ButtonGroup, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { m, AnimatePresence } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";

import { PATH_AUTH, PATH_DASHBOARD } from "src/routes/paths";
import { MotionContainer } from "src/components/animate";
import { useCawProvider } from "src/context/WalletConnectContext";
import useCawNameMinterContract from "src/hooks/useCawNameMinterContract";

import { animation } from '../connect';
import WalletConnection from "./WalletConnection";
import ConfirmAndMintCard from "./ConfirmAndMintCard";
import MintUserNameCard from "./MintUserNameCard";
import WalletBalanceCard from './WalletBalance';
import NftPriceLegend from "./NftPriceLegend";
import { getBlockChainErrMsg } from "src/hooks/contractHelper";
import AlertMessage from "src/components/AlertMessage";


const maxSteps = 4;
function getProgress(step: number) {
    return (step / maxSteps) * 100;
}

export default function FormStepper() {

    const bg = useColorModeValue('gray.50', 'gray.800');
    const boxBg = useColorModeValue('white', 'gray.700');
    const { mint, isLoading, minting } = useCawNameMinterContract();
    const { replace } = useRouter();
    const [ step, setStep ] = useState(1);
    const [ progress, setProgress ] = useState(getProgress(step));
    const toast = useToast();
    const { t } = useTranslation();
    const { address, connected } = useCawProvider();
    const [ error, setError ] = useState<string | null>(null);

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

    const { termsAccepted, isValid } = methods.watch();

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

            const url = PATH_AUTH.minted.replace(':username', userName).replace(':tx', receipt?.transactionHash || 'xxx');
            replace(url);

        } catch (error: any) {
            const { message, code } = getBlockChainErrMsg(error);
            setError(message ? message + ' : ' + code : 'Something went wrong');
            console.error(`🐛  -> 🔥 :  onSubmit 🔥 :  error`, error);
        }
    };

    const Steps = (step: number) => {

        switch (step) {
            case 1:
                return <WalletConnection />;
            case 2:
                return <WalletBalanceCard />;
            case 3:
                return <MintUserNameCard />
            case 4:
                return <ConfirmAndMintCard />;
            default:
                return null;
        }
    }

    return (
        <MotionContainer>
            <div>
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Flex
                            minH={'100vh'}
                            align={'center'}
                            justify={'center'}
                            bg={bg}
                        >
                            <Stack spacing={5} mx={'auto'} maxW={'full'} py={6} px={6}>
                                <Stack align={'center'}>
                                    <Text
                                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                                        bgClip="text"
                                        fontSize="3xl"
                                        fontWeight="extrabold"
                                        // p="9"
                                        align="center"
                                        opacity="0"
                                        as={m.div}
                                        animation={animation}
                                    >
                                        {t('minting_page.message')}
                                    </Text>
                                    <NftPriceLegend />
                                </Stack>
                                <Progress
                                    value={progress}
                                    colorScheme="caw"
                                    mb="5%"
                                    mx="5%"
                                    borderRadius={10}
                                />
                                <Box
                                    minWidth={'container.md'}
                                    bg={boxBg}
                                    rounded={'lg'}
                                    boxShadow={'2xl'}
                                    p={8}
                                >
                                    <AnimatePresence>
                                        {Steps(step)}
                                    </AnimatePresence>
                                    {error && (<AlertMessage type="warning" message={error} />)}
                                    <ButtonGroup mt="5%" w="100%">
                                        <Flex w="100%" justifyContent="space-between">
                                            <Button
                                                isDisabled={step === 1}
                                                colorScheme="caw"
                                                variant="solid"
                                                w="7rem"
                                                mr="5%"
                                                onClick={() => {
                                                    const newStep = step - 1;
                                                    setStep(newStep);
                                                    setProgress(getProgress(newStep));
                                                }}
                                            >
                                                {t('buttons.btn_back')}
                                            </Button>
                                            {step !== maxSteps && (
                                                <Button
                                                    w="7rem"
                                                    onClick={() => {
                                                        const newStep = step + 1;
                                                        setStep(newStep);
                                                        setProgress(getProgress(newStep));
                                                    }}
                                                    colorScheme="caw"
                                                    variant="outline"
                                                    disabled={isLoading || minting ? true : false}
                                                >
                                                    {t('buttons.btn_next')}
                                                </Button>
                                            )}
                                            {step === maxSteps && (
                                                <Button
                                                    type="submit"
                                                    w="7rem"
                                                    colorScheme="green"
                                                    variant="solid"
                                                    isLoading={isLoading || minting}
                                                    loadingText={t('labels.minting')}
                                                    disabled={isLoading || minting ? true : (!connected || !termsAccepted || !isValid)}
                                                >
                                                    {t('buttons.btn_mint')}
                                                </Button>
                                            )}
                                        </Flex>
                                    </ButtonGroup>
                                </Box>
                                <Spacer />
                                <Flex>
                                    <NextLink href={PATH_DASHBOARD.swap.mcaw} passHref>
                                        <Link color={'blue.400'}>{t('buttons.btn_swap')}</Link>
                                    </NextLink>                                    
                                    <Spacer />
                                    <NextLink href={PATH_AUTH.connect} passHref>
                                        <Link color={'blue.400'}>{t('minting_page.already_minted')}</Link>
                                    </NextLink>
                                </Flex>
                            </Stack>
                        </Flex>
                    </form>
                </FormProvider>
            </div>
        </MotionContainer>
    );
}
