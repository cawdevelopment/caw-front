import { Box, Button, Container, Stack, Text, Center } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import NextLink from 'next/link';
import { m } from "framer-motion";

import PageWrapper, { Layout } from 'components/wrappers/Page';
import { PATH_AUTH } from "routes/paths";
import { animation } from './connect'

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

export default function RegisterPage() {

    const { t } = useTranslation();

    return (
        <PageWrapper title="Mint your username">
            <Container w="full" maxW={"container.xl"} maxH="container.xl" p={10}>
                <Text
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    fontSize="3xl"
                    fontWeight="extrabold"
                    p="9"
                    align="center"
                    opacity="0"
                    as={m.div}
                    animation={animation}
                >
                    {t('minting_page.message')}
                </Text>
                <Center >
                    <Stack direction={{ base: 'column', sm: 'row' }} spacing={5} alignItems="center" textAlign={"center"}>
                        <div>
                            <Box sx={{ mt: 5 }}>
                                <p>
                                    {t('minting_page.already_minted')}
                                </p>
                                <NextLink href={PATH_AUTH.connect} passHref>
                                    <Button
                                        variant="solid"
                                        size="lg"
                                        sx={{ textTransform: 'none' }}
                                    >
                                        {t('buttons.btn_access')}
                                    </Button>
                                </NextLink>
                            </Box>
                        </div>
                    </Stack>
                </Center>
            </Container>
        </PageWrapper>
    );
}