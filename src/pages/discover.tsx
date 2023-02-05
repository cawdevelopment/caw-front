import { Container } from "@chakra-ui/react";

import PageWrapper, { Layout } from 'src/components/wrappers/Page';

DiscoverPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="landing">{page}</Layout>;
};

export default function DiscoverPage() {
    return (
        <PageWrapper title="Discover">
            <Container w="full" maxW={"container.xl"} h="container.lg" p={10}>
                <div>
                    <p>
                        Find out what's happening in the world right now. Get the latest
                    </p>
                </div>
            </Container>
        </PageWrapper>
    );
}