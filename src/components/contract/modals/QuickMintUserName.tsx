import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NextLink from 'next/link';
import { useDebounce } from "use-debounce";
import {
    Box, Button, Input, Link, Text, Stack, HStack, useDisclosure,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react";

import { useCawNameMinterContract } from "src/hooks";
import AlertDialog from "src/components/dialogs/AlertDialog";
import { useDappProvider } from "src/context/DAppConnectContext";
import AlertMessage from "src/components/AlertMessage";
import { getBlockChainErrMsg, getExplorerUrl } from "src/hooks/contracts/helper";
import { sentenceCase, shortenAddress } from "src/utils/helper";
import { PATH_AUTH } from "src/routes/paths";

function MintNFTNameForm() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { t } = useTranslation();
    const { address, connected, chain } = useDappProvider();
    const [ value, setValue ] = React.useState();
    const [ debouncedValue ] = useDebounce(value, 500);
    const { mint, minting } = useCawNameMinterContract();
    const [ txMintHash, setTxMintHash ] = useState(null);
    const [ error, setError ] = useState<string | null>(null);

    const handleChange = (event: any) => setValue(event.target.value);


    const handleMint = async () => {
        try {
            if (!address || !debouncedValue || !connected)
                throw new Error("No address");

            const { tx } = await mint(debouncedValue, address);
            setTxMintHash(tx.hash);

        } catch (error) {
            const { code, message } = getBlockChainErrMsg(error);
            setError(message ? message + ' : ' + code : 'Something went wrong');
        }
    }

    const handleReset = () => {
        setTxMintHash(null);
        setValue(undefined);
        setError(null);
    }

    const mintExplorerTxUrl = getExplorerUrl({ addressOrTx: txMintHash || '', network: chain?.id || 0, type: 'tx' });
    return (
        <Box>
            <Stack spacing={2}>
                <Input
                    placeholder={t('labels.entery_user')}
                    value={value}
                    readOnly={Boolean(txMintHash)}
                    onChange={handleChange}
                />
                <HStack>
                    <Button
                        width={"full"}
                        colorScheme="caw"
                        disabled={!connected || Boolean(txMintHash)}
                        isLoading={minting}
                        loadingText={t('labels.minting')}
                        onClick={debouncedValue && onOpen}
                    >
                        {t('buttons.btn_mint')}
                    </Button>
                    {Boolean(txMintHash) && (
                        <Button
                            mt={5}
                            width={"full"}
                            colorScheme="blue"
                            onClick={handleReset}
                        >
                            {t('buttons.btn_start_over')}
                        </Button>
                    )}
                </HStack>
                <AlertDialog
                    isOpen={isOpen}
                    title={sentenceCase(t('verbs.confirm'))}
                    cancelText={sentenceCase(t('verbs.cancel'))}
                    confirmText={sentenceCase(t('verbs.mint'))}
                    confirmColorScheme="blue"
                    body={t('minting_page.confirm_mnt').replace('{0}', debouncedValue || '')}
                    onClose={onClose}
                    onConfirm={handleMint}
                />
                {error && (<AlertMessage type="warning" message={error} />)}
                {Boolean(txMintHash) && (
                    <Text color="green.500" as="b">
                        {`${t('labels.minted')}`}
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
}

export function QuickMintingUserName({ isOpen, onClose }: QuickMintingUserNameProps) {

    const { t } = useTranslation();
    return (
        <>
            <Modal
                isCentered
                motionPreset='slideInBottom'
                isOpen={isOpen}
                closeOnEsc={true}
                closeOnOverlayClick={false}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('labels.mintuser')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <MintNFTNameForm />
                    </ModalBody>
                    <ModalFooter alignItems="center">
                        <NextLink href={PATH_AUTH.mint} target="_blank" rel="noopener noreferrer" passHref>
                            <Link color={'blue.400'} textDecoration="none">
                                {t('labels.quickmintlabel')}
                            </Link>
                        </NextLink>
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
            <Button
                colorScheme='blue'
                variant={"ghost"}
                size="sm"
                onClick={onOpen}
            >
                {t('labels.quickmint')}
            </Button>
            <QuickMintingUserName isOpen={isOpen} onClose={onClose} />
        </>
    );
}
