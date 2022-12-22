import { Box, Stack, Text, Heading, Link, Code, Spacer, useColorModeValue } from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";

import NavbarAccount from 'src/components/sidebar/NavbarAccount';
import { useCawProvider } from "src/context/WalletConnectContext";

export default function WalletConnection() {

    const { t } = useTranslation();
    const fontColor1 = useColorModeValue("gray.500", "gray.50");
    const fontColor2 = useColorModeValue("gray.600", "gray.100");
    const fontColor3 = useColorModeValue("gray.900", "gray.200");
    const { connected } = useCawProvider();

    return (
        <Stack spacing={8}>
            <Box textAlign="center" py={10} px={6} maxWidth="container.md">
                <InfoIcon boxSize={'50px'} color={'blue.500'} />
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
                    {t('minting_page.ntf_state_q')}
                </Heading>
                <Text color={fontColor2} >
                    {t('minting_page.ntf_state_a')}
                </Text>
                <Spacer h={5} />
                <Text color={fontColor3} >
                    {t('minting_page.ntf_state_ai')}
                </Text>
                <Spacer h={10} />
                <Stack direction='column' textAlign={"left"}>
                    <Code colorScheme='yellow' children={t('minting_page.wizard_step1_lb1')} />
                    <Code colorScheme="teal" children={t('minting_page.wizard_step1_lb3')} />
                </Stack>
                <Spacer h={10} />
                <NavbarAccount displayAddressMode="full" displaMode="carousel" showFooter={false} />
            </Box>
        </Stack>
    );
}
