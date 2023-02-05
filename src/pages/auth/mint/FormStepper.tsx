import { useCallback, useEffect, useState } from "react";
import NextLink from 'next/link';
import { Box, Button, Stack, Text, Flex, useColorModeValue, Link, Spacer, Progress, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { m } from "framer-motion";

import { PATH_DASHBOARD } from "src/routes/paths";
import { MotionContainer, WrapperFadeAnimation } from "src/components/animate";
import { useDappProvider } from "src/context/DAppConnectContext";
import AlertMessage from "src/components/AlertMessage";
import AlertDialogConfirm from "src/components/dialogs/AlertDialog";
import { sentenceCase } from "src/utils/helper";

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
    processing: boolean;
    isValid: boolean;
    userName: string;
    error: string | null;
}

export default function FormStepper(props: Props) {

    const { termsAccepted, processing, isValid, userName, error, submit } = useMintingPageContext();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const bg = useColorModeValue('gray.50', 'gray.800');
    const boxBg = useColorModeValue('white', 'gray.700');
    const [ step, setStep ] = useState(1);
    const [progress, setProgress] = useState(getProgress(step));
    const { t } = useTranslation();
    const { connected } = useDappProvider();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.screenY = 0;
    }, [ step ]);

    const handleNext = useCallback(() => {

        const newStep = step + 1;
        setStep(newStep);
        setProgress(getProgress(newStep));
    }, [ step ]);

    const handleBack = useCallback(() => {

        const newStep = step - 1;
        setStep(newStep);
        setProgress(getProgress(newStep));
    }, [ step ]);


    const handleMint = useCallback(() => {
        onClose();
        submit();
    }, [ onClose, submit ]);
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
                            bg={boxBg}
                            rounded={'lg'}
                            boxShadow={'2xl'}
                            p={8}
                        >
                            <Steps userName={userName} step={step} />

                            <WrapperFadeAnimation
                                show={Boolean(error)}
                            >
                                <AlertMessage
                                    type="warning"
                                    message={error}
                                    showCloseButton={true}
                                    showIcon={true}
                                    maxWidth="container.xl"
                                />
                            </WrapperFadeAnimation>

                            <ButtonGroup mt="5%" w="100%">
                                <Flex w="100%" justifyContent="space-between">
                                    <Button
                                        isDisabled={step === 1}
                                        colorScheme="caw"
                                        variant="solid"
                                        w="8rem"
                                        mr="5%"
                                        onClick={handleBack}
                                    >
                                        {t('buttons.btn_back')}
                                    </Button>
                                    {step !== maxSteps && (
                                        <Button
                                            w="8rem"
                                            onClick={handleNext}
                                            colorScheme="caw"
                                            variant="outline"
                                            disabled={processing}
                                        >
                                            {t('buttons.btn_next')}
                                        </Button>
                                    )}
                                    {step === maxSteps && (
                                        <Button
                                            type="button"
                                            w="8rem"
                                            colorScheme="blue"
                                            variant="solid"
                                            isLoading={processing}
                                            loadingText={t('labels.minting')}
                                            disabled={processing ? true : (!connected || !termsAccepted || !isValid || !userName)}
                                            onClick={onOpen}
                                        >
                                            {t('buttons.btn_mint')}
                                        </Button>
                                    )}
                                </Flex>
                            </ButtonGroup>
                        </Box>
                        <Spacer />
                        <Flex
                            direction={{ base: "column", md: "row" }}
                            alignItems="center"
                            justifyContent="center"
                            rowGap={2}
                        >
                            <Link
                                as={NextLink}
                                href={PATH_DASHBOARD.app.home}
                                color={'blue.400'}
                                rel="noopener noreferrer"
                            >
                                <b>{t('labels.dashboard')}</b>
                            </Link>
                        </Flex>
                        <br />
                    </Stack>
                </Flex>
            </div>
            <AlertDialogConfirm
                isOpen={isOpen}
                title={sentenceCase(t("verbs.confirm"))}
                cancelText={sentenceCase(t("verbs.cancel"))}
                confirmText={sentenceCase(t("verbs.mint"))}
                confirmColorScheme="green"
                onClose={onClose}
                onConfirm={handleMint}
                body={<p>
                    {t("minting_page.confirm_mnt").replace("{0}", "").replace("?", "")} <b>{userName}</b>
                    <br />
                    <br />
                    <p>{t("minting_page.confirmation_req")}</p>
                </p>}
            />
        </MotionContainer>
    );
}
