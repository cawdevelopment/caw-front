import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useDebounce } from "use-debounce";
import dynamic from "next/dynamic";
import {
    Box, Input, Button, Link, Text, Stack, HStack, useDisclosure, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from "@chakra-ui/react";

import { useCawNameMinterContract, useMintableCAWContract, useTranslation } from "src/hooks";
import AlertMessage from "src/components/AlertMessage";
import WrapperFadeAnimation from "src/components/animate/WrapperFade";
import { useDappProvider } from "src/context/DAppConnectContext";
import { getBlockChainErrMsg, getExplorerUrl } from "src/hooks/contracts/helper";
import { sentenceCase, shortenAddress } from "src/utils/helper";
import { isValidUsername as validateUserNameLocally } from "src/utils/manifestoHelper";
import { PATH_AUTH } from "src/routes/paths";

const BlockChainOperationInProgressModal = dynamic(() => import("src/components/dialogs/BlockChainOperationInProgressModal"), { ssr: false });
const AlertDialogConfirm = dynamic(() => import("src/components/dialogs/AlertDialog"), { ssr: false });

function MintNFTNameForm() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();
    const { address, connected, chain } = useDappProvider();
    const [ value, setValue ] = useState();
    const [ costCAW, setCostCAW ] = useState(0);
    const [ debouncedValue ] = useDebounce(value, 200);
    const [ txMintHash, setTxMintHash ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ processing, setProcessing ] = useState(false);
    const [ isValid, setIsValid ] = useState(false);
    const [ existing, setExisting ] = useState(false);

    const [ mintingCawName, setMintingCawName ] = useState(false);
    const [ breakPoint, setBreakPoint ] = useState<string>('');
    const [ txSent, setTxSent ] = useState(false);

    const { initialized: CAWNamesMinterContractInitialized, getIdByUserName, getCostOfName, mint: mintCAWUsername } = useCawNameMinterContract({
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
            setTxMintHash(rcpt.transactionHash || null);
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

            if (method === 'approve' && !mintingCawName && debouncedValue)
                mintCAWUsername(debouncedValue);
        },
        onError: (err) => {
            setProcessing(false);
            const { message, code } = getBlockChainErrMsg(err);
            setError(message ? message + ' : ' + code : 'Something went wrong');
        },
        onCompleted: (method) => {

            if (method === 'approve' && !mintingCawName && debouncedValue)
                mintCAWUsername(debouncedValue);
        }
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
            setUserNameError(valid ? null : `${value} : ${t("minting_page.username_already_taken")}`);

        const checkExisting = async () => {
            try {
                const id = await getIdByUserName(value);

                if (isMounted) {

                    const existing = id !== 0;
                    setExisting(existing);

                    if (existing) {
                        setIsValid(false);
                        setUserNameError(`${value} : ${t("minting_page.username_already_taken")}`);
                    }
                    else {
                        setUserNameError(null);
                        setUserNameError(`${value} : ${t("minting_page.username_available")}`);
                    }
                }
            }
            catch (error) {
                const { message, code } = getBlockChainErrMsg(error);
                setUserNameError(message ? message + " : " + code : "Something went wrong");
            }
        };

        if (valid && !txMintHash)
            checkExisting();

        return () => {
            isMounted = false;
        };
    }, [ value, txMintHash, t, , getIdByUserName ]);

    const handleMint = async () => {
        try {
            if (!address || !debouncedValue || !connected)
                throw new Error("No address");

            if (!mCAWContractInitialized || !CAWNamesMinterContractInitialized)
                throw new Error("Contracts not initialized, please try again later");

            const costInfo = await getCostOfName(debouncedValue);
            setCostCAW(costInfo.cost);
            mintMCAW(address, costInfo.cost);
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
        setCostCAW(0);
        setMintingCawName(false);
        setBreakPoint('');
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
                <AlertDialogConfirm
                    isOpen={isOpen}
                    title={sentenceCase(t("verbs.confirm"))}
                    cancelText={sentenceCase(t("verbs.cancel"))}
                    confirmText={sentenceCase(t("verbs.mint"))}
                    confirmColorScheme="green"
                    onClose={onClose}
                    onConfirm={handleMint}
                    body={<p>
                        {t("minting_page.confirm_mnt").replace("{0}", "").replace("?", "")} <b>{debouncedValue}</b>
                        <br />
                        <br />
                        <p>{t("minting_page.confirmation_req")}</p>
                    </p>}
                />
                <BlockChainOperationInProgressModal
                    processing={processing}
                    txSent={txSent}
                    message={breakPoint}
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
