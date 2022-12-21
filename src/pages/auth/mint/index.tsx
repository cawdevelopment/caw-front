import { Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import FormStepper from "./FormStepper";

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

export default function RegisterPage() {

    const { t } = useTranslation();

    return (
        <PageWrapper title={t('minting_page.title')}>
            <Container w="full" maxW={"container.xl"} h="container.lg" p={0}>
                <FormStepper />
            </Container>
        </PageWrapper>
    );
}