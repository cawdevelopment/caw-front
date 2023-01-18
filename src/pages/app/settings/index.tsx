import { Heading, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import DisplaySettings from './Display';
import LanguageSettings from './Language';
import SettingFullscreen from './SettingFullscreen';

SettingsPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function SettingsPage() {
    const { t } = useTranslation();
    return (
        <PageWrapper title={t('settings_page.title')}>
            <Heading variant="h3">
                {t('settings_page.title')}
            </Heading>
            <Stack spacing={10} m={4}>
                <DisplaySettings />
                <LanguageSettings />
                <SettingFullscreen />
            </Stack>
        </PageWrapper >
    );
}