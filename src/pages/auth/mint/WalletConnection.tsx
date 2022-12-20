import { Box, Stack, Text, Heading, Link, Code, Spacer } from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";

import NavbarAccount from 'src/components/sidebar/NavbarAccount';
import { useCawProvider } from "src/context/WalletConnectContext";

export default function WalletConnection() {

    const { t } = useTranslation();
    const { connected } = useCawProvider();

    return (
        <Stack spacing={8}>
            <Box textAlign="center" py={10} px={6}>
                <InfoIcon boxSize={'50px'} color={'blue.500'} />
                <Heading as="h2" size="md" mt={6} mb={2}>
                    {connected ? '' :
                        <>
                            {t('minting_page.step_title')} <Link color={'blue.400'}>{t('minting_page.step_title_wallet')}</Link>
                        </>}
                </Heading>
                <Text color={'gray.500'}>
                    {t('minting_page.step_description')}
                </Text>
                <Spacer h={10} />
                <Stack direction='column' textAlign={"left"}>
                    <Code colorScheme='yellow' children={t('minting_page.wizard_step1_lb1')} />
                    <Code children={t('minting_page.wizard_step1_lb2')} />
                    <Code colorScheme="teal" children={t('minting_page.wizard_step1_lb3')} />
                </Stack>
                <Spacer h={10} />
                <NavbarAccount displayAddressMode="full" />
            </Box>
        </Stack>
    );
}
