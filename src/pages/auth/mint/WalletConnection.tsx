import { Box, Stack, Text, Heading, Link, Code, Spacer, useColorModeValue, useBreakpoint } from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";

import NavbarAccount from 'src/components/contract/wallet/NavbarAccount';
import { useDappProvider } from "src/context/DAppConnectContext";
import { useEffect, useRef } from "react";

type Props = {
    onInitilizedBox: (width: number) => void;
}

export default function WalletConnection({ onInitilizedBox }: Props) {

    const { t } = useTranslation();
    const fontColor1 = useColorModeValue("gray.500", "gray.50");
    const fontColor2 = useColorModeValue("gray.600", "gray.100");
    const fontColor3 = useColorModeValue("gray.900", "gray.200");
    const { connected } = useDappProvider();
    const refDiv = useRef<HTMLDivElement>(null);
    const breakpoint = useBreakpoint({ ssr: false })

    useEffect(() => {

        if (refDiv?.current) {

            if (breakpoint === 'base' || breakpoint === 'sm')
                onInitilizedBox(0);
            else
                onInitilizedBox(refDiv.current.clientWidth);
        }

    }, [ onInitilizedBox, breakpoint ]);

    return (
        <Stack spacing={8}>
            <Box
                id="box-wallet-connection"
                textAlign="center"
                py={10}
                px={6}
                ref={refDiv}
                maxWidth="container.md"
            >
                <InfoIcon boxSize={'3.125rem'} color={'blue.500'} />
                <Heading as="h2" size="md" mt={6} mb={2}>
                    {connected ? '' :
                        <>
                            {t('minting_page.step_title')} <Link color={'blue.400'}>{t('minting_page.step_title_wallet')}</Link>
                        </>}
                </Heading>
                <Text color={fontColor1}>
                    {t('minting_page.step_description')}
                </Text>
                <Heading as="h3" size="md" mt={6} mb={2}>
                    {t('minting_page.nft_state_q')}
                </Heading>
                <Text color={fontColor2} >
                    {t('minting_page.nft_state_a')}
                </Text>
                <Spacer h={5} />
                <Text color={fontColor3} >
                    {t('minting_page.nft_state_ai')}
                </Text>
                <Spacer h={10} />
                <Stack direction='column' textAlign={"left"}>
                    <Code colorScheme='yellow' children={t('minting_page.wizard_step1_lb1')} />
                    <Code colorScheme='blue' children={t('minting_page.wizard_step1_lb2')} />
                    <Code colorScheme="teal" children={t('minting_page.wizard_step1_lb3')} />
                </Stack>
                <Spacer h={10} />
                <NavbarAccount displayAddressMode="full" displaMode="carousel" showFooter={false} />
            </Box>
        </Stack>
    );
}
