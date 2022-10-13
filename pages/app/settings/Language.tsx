import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Block from "src/components/Block";
import LanguagePopover from 'src/components/settings/LanguagePopover';

export default function LanguajeSettings() {

    const { t } = useTranslation();
    return (
        <Block
            title={t('labels.language')}
            subtitle={t('settings.language_description')}
        >
            <Stack direction="row" alignItems="center" spacing={0}>
                <Typography variant="subtitle2">
                    {t('labels.select_lang')}
                </Typography>
                <LanguagePopover />
            </Stack>
        </Block>
    );
}