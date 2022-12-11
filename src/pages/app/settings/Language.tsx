import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import Block from "src/components/Block";
import LanguagePopover from 'src/components/settings/LanguagePopover';

export default function LanguajeSettings() {

    const { t } = useTranslation();
    const bgMenu = useColorModeValue('whiteAlpha.900', 'gray.800');

    return (
        <Block
            title={t('labels.language')}
            subtitle={t('settings_page.language_description')}
        >
            <Stack direction="row" alignItems="center" spacing={0}>
                <Text as="b">
                    {t('labels.select_lang')}
                </Text>
                <LanguagePopover bgIPopover={bgMenu} />
            </Stack>
        </Block>
    );
}