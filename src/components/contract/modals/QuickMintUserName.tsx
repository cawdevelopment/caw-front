import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";
import { useDebounce } from "use-debounce";
import dynamic from "next/dynamic";
import {
    Box, Button, Input, Link, Text, Stack, HStack, useDisclosure, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from "@chakra-ui/react";

import { useCawNameMinterContract } from "src/hooks";
import AlertDialog from "src/components/dialogs/AlertDialog";
import AlertMessage from "src/components/AlertMessage";
import WrapperFadeAnimation from "@components/animate/WrapperFade";
import { useDappProvider } from "src/context/DAppConnectContext";
import { getBlockChainErrMsg, getExplorerUrl } from "src/hooks/contracts/helper";
import { sentenceCase, shortenAddress } from "src/utils/helper";
import { isValidUsername as validateUserNameLocally } from "src/utils/manifestoHelper";
import { PATH_AUTH } from "src/routes/paths";

const BlockChainOperationInProgressModal = dynamic(() => import("@components/dialogs/BlockChainOperationInProgressModal"), { ssr: false });

function MintNFTNameForm() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();
    const { address, connected, chain } = useDappProvider();
    const [ value, setValue ] = React.useState();
    const [ debouncedValue ] = useDebounce(value, 500);
    const [ txMintHash, setTxMintHash ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ processing, setProcessing ] = useState(false);
    const [ isValid, setIsValid ] = useState(false);
    const [ existing, setExisting ] = useState(false);
    const [ txSent, setTxSent ] = useState(false);

    const { mint, getIdByUserName } = useCawNameMinterContract({
        onBeforeSend: () => {
            setProcessing(true);
        },
        onTxSent: () => {
            setTxSent(true);
        },
        onTxConfirmed: (tx) => {
            setTxMintHash(tx.transactionHash);
        },
        onError: (err) => {
            const { message, code } = getBlockChainErrMsg(err);
            setError(message ? message + " : " + code : "Something went wrong");
        },
        onCompleted: () => {
            setProcessing(false);
        },
    });

    const [ userNameError, setUserNameError ] = useState<string | null>(null);
    const handleChange = (event: any) => {
        setValue(event.target.value);
    };
    const handleCloseModalBlockChainOperation = () => {
        setTxSent(false);
        setTxMintHash(null);
        setProcessing(false);
    };

    useEffect(() => {

        if (!value)
            return;

        let isMounted = true;
        const valid = validateUserNameLocally(value);
        setIsValid(valid);

        if (isMounted && !valid)
            setUserNameError(
                valid ? null : `${value} : ${t("minting_page.username_already_taken")}`
            );

        const checkExisting = async () => {
            try {
                const id = await getIdByUserName(value);
                if (isMounted) {
                    const existing = id !== 0;
                    setExisting(existing);
                    if (existing) {
                        setIsValid(false);
                        setUserNameError(
                            `${value} : ${t("minting_page.username_already_taken")}`
                        );
                    } else {
                        setUserNameError(null);
                        setUserNameError(
                            `${value} : ${t("minting_page.username_available")}`
                        );
                    }
                }
            } catch (error) {
                const { message, code } = getBlockChainErrMsg(error);
                setUserNameError(
                    message ? message + " : " + code : "Something went wrong"
                );
            }
        };

        if (valid) checkExisting();

        return () => {
            isMounted = false;
        };
    }, [ value, getIdByUserName, t ]);

    const handleMint = () => {
        try {
            if (!address || !debouncedValue || !connected)
                throw new Error("No address");

            mint(debouncedValue);
        } catch (error) {
            setProcessing(false);
            const { code, message } = getBlockChainErrMsg(error);
            setError(message ? message + " : " + code : "Something went wrong");
        }
    };

    const handleReset = () => {
        setTxMintHash(null);
        setValue(undefined);
        setError(null);
        setUserNameError(null);
        setExisting(false);
        setIsValid(false);
    };

    const mintExplorerTxUrl = getExplorerUrl({
        addressOrTx: txMintHash || "",
        network: chain?.id || 0,
        type: "tx",
    });

    return (
        <Box>
            <Stack spacing={2}>
                <Input
                    placeholder={t("labels.entery_user")}
                    value={value}
                    readOnly={Boolean(txMintHash)}
                    onChange={handleChange}
                />
                <WrapperFadeAnimation
                    show={!Boolean(txMintHash) && Boolean(value)}
                    exitDuration={0.5}
                >
                    <AlertMessage
                        type={isValid && !existing ? "success" : "warning"}
                        variant="subtle"
                        showIcon={isValid}
                        message={userNameError || ""}
                    />
                </WrapperFadeAnimation>
                <HStack>
                    <Button
                        width={"full"}
                        colorScheme="caw"
                        disabled={!connected || Boolean(txMintHash)}
                        isLoading={processing}
                        loadingText={t("labels.minting")}
                        onClick={debouncedValue && onOpen}
                    >
                        {t("buttons.btn_mint")}
                    </Button>
                    {Boolean(txMintHash) && (
                        <Button
                            mt={5}
                            width={"full"}
                            colorScheme="blue"
                            onClick={handleReset}
                        >
                            {t("buttons.btn_start_over")}
                        </Button>
                    )}
                </HStack>
                <WrapperFadeAnimation show={Boolean(processing)} exitDuration={0.5}>
                    <Text>
                        {t("minting_page.longerResponse")} <br />
                    </Text>
                </WrapperFadeAnimation>
                <AlertDialog
                    isOpen={isOpen}
                    title={sentenceCase(t("verbs.confirm"))}
                    cancelText={sentenceCase(t("verbs.cancel"))}
                    confirmText={sentenceCase(t("verbs.mint"))}
                    confirmColorScheme="blue"
                    body={t("minting_page.confirm_mnt").replace(
                        "{0}",
                        debouncedValue || ""
                    )}
                    onClose={onClose}
                    onConfirm={handleMint}
                />
                <BlockChainOperationInProgressModal
                    processing={processing}
                    txSent={txSent}
                    message={t("minting_page.minting_ntf")}
                    onClose={handleCloseModalBlockChainOperation}
                />
                {error && !Boolean(txMintHash) && (
                    <AlertMessage type="warning" message={error} />
                )}
                {Boolean(txMintHash) && (
                    <Text color="green.500" as="b">
                        {`${t("labels.minted")}`}
                    </Text>
                )}
                {txMintHash && (
                    <Link href={mintExplorerTxUrl} isExternal>
                        <Text color="blue.500" as="a">
                            {`TX ${shortenAddress(txMintHash)} Etherscan`}
                        </Text>
                    </Link>
                )}
            </Stack>
        </Box>
    );
}

type QuickMintingUserNameProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function QuickMintingUserName({ isOpen, onClose, }: QuickMintingUserNameProps) {

    const { t } = useTranslation();

    return (
        <>
            <Modal
                isCentered
                motionPreset="slideInBottom"
                isOpen={isOpen}
                closeOnEsc={true}
                closeOnOverlayClick={false}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("labels.mintuser")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <MintNFTNameForm />
                    </ModalBody>
                    <ModalFooter alignItems="center">
                        <Link
                            as={NextLink}
                            href={PATH_AUTH.mint}
                            color={"blue.400"}
                            textDecoration="none"
                        >
                            {t("labels.quickmintlabel")}
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export function QuickMintingUserNameButton() {

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button colorScheme="blue" variant={"ghost"} size="sm" onClick={onOpen}>
                {t("labels.quickmint")}
            </Button>
            <QuickMintingUserName isOpen={isOpen} onClose={onClose} />
        </>
    );
}
