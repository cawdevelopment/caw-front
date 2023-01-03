import { useEffect, useState } from "react";
import NextLink from 'next/link';
import { Box, Button, Stack, Text, Flex, useColorModeValue, Link, Spacer, Progress, ButtonGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { m } from "framer-motion";

import { PATH_AUTH, PATH_DASHBOARD } from "src/routes/paths";
import { MotionContainer } from "src/components/animate";
import { useCawProvider } from "src/context/WalletConnectContext";
import AlertMessage from "src/components/AlertMessage";

import { useMintingPageContext } from '.';
import { animation } from '../connect';
import NftPriceLegend from "./NftPriceLegend";
import Steps from "./Steps";

const maxSteps = 4;
function getProgress(step: number) {
    return (step / maxSteps) * 100;
}

type Props = {
    termsAccepted: boolean;
    isLoading: boolean;
    minting: boolean;
    isValid: boolean;
    userName: string;
    error: string | null;
}

export default function FormStepper(props: Props) {

    const { termsAccepted, isLoading, minting, isValid, userName, error } = useMintingPageContext();
    const bg = useColorModeValue('gray.50', 'gray.800');
    const boxBg = useColorModeValue('white', 'gray.700');
    const [ step, setStep ] = useState(1);
    const [progress, setProgress] = useState(getProgress(step));
    const { t } = useTranslation();
    const { connected } = useCawProvider();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.screenY = 0;
    }, [ step ]);

    return (
        <MotionContainer>
            <div>
                <Flex
                    // minH={'100vh'}
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
                                align="center"
                                opacity="0"
                                as={m.div}
                                animation={animation}
                            >
                                {t('minting_page.message')}
                            </Text>
                            <NftPriceLegend />                            
                            <AlertMessage
                                type="info"
                                variant="solid"
                                title={t('labels.under_dev')}
                                message={t('labels.testnet_msg')}
                                showCloseButton={true}
                            />
                        </Stack>
                        <Progress
                            value={progress}
                            colorScheme="caw"
                            mb="5%"
                            mx="5%"
                            borderRadius={10}
                        />
                        <Box
                            // minWidth={'container.md'}
                            bg={boxBg}
                            rounded={'lg'}
                            boxShadow={'2xl'}
                            p={8}
                        >
                                <Steps
                                    userName={userName}
                                    step={step}
                            />
                            {error && (<AlertMessage type="warning" message={error} />)}
                            <ButtonGroup mt="5%" w="100%">
                                <Flex w="100%" justifyContent="space-between">
                                    <Button
                                        isDisabled={step === 1}
                                        colorScheme="caw"
                                        variant="solid"
                                        w="8rem"
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
                                            w="8rem"
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
                                            w="8rem"
                                            colorScheme="green"
                                            variant="solid"
                                            isLoading={isLoading || minting}
                                            loadingText={t('labels.minting')}
                                            disabled={isLoading || minting ? true : (!connected || !termsAccepted || !isValid || !userName)}
                                        >
                                            {t('buttons.btn_mint')}
                                        </Button>
                                    )}
                                </Flex>
                            </ButtonGroup>
                        </Box>
                        <Spacer />
                        <Flex direction={{ base: "column", md: "row" }} alignItems="center" rowGap={2}>
                            <NextLink href={PATH_DASHBOARD.swap.mcaw} passHref>
                                <Link color={'blue.400'}>
                                    <b>{t('labels.getmcaw')}</b>
                                </Link>
                            </NextLink>
                            <Spacer />
                            <NextLink href={PATH_AUTH.connect} passHref>
                                <Link color={'blue.400'}>{t('minting_page.already_minted')}</Link>
                            </NextLink>
                        </Flex>
                    </Stack>
                </Flex>
            </div>
        </MotionContainer>
    );
}
