import { Heading, Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

import PageWrapper, { Layout } from 'src/components/wrappers/Page';

const DisplaySettings = dynamic(() => import("./Display"), { ssr: false });
const LanguageSettings = dynamic(() => import("./Language"), { ssr: false });
const SettingFullscreen = dynamic(() => import("./SettingFullscreen"), { ssr: false });

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