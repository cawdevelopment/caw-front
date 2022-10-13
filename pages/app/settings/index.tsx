import { Stack, Text } from "@chakra-ui/react";

import PageWrapper, { Layout } from 'components/wrappers/Page';

SettingsPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function SettingsPage() {

    return (
        <PageWrapper title={"Settings"}>
            <Stack spacing={2}>
                <Text variant="h3">
                    Settings
                </Text>
            </Stack>
        </PageWrapper >
    );
}