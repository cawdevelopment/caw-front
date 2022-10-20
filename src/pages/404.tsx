import React from "react";
import { m } from 'framer-motion';
import NextLink from 'next/link';
import { useTranslation } from "react-i18next";
import { Box, Button, Heading, Text, Container, useColorModeValue } from '@chakra-ui/react';

import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import { varBounce } from 'src/components/animate';
import { PageNotFoundIllustration } from 'src/assets';

Page404.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};

export default function Page404() {

  const { t } = useTranslation();
  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <PageWrapper title={t('404.title')}>
      <Container w="full" maxW={"container.xl"} h="container.lg" p={10} bg={bg}>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <m.div variants={varBounce().in}>
            <Heading variant="h3" p={3}>
              {t('404.title')}
            </Heading>
          </m.div>
          <Text color='gray.600' p={3}>
            {t('404.description')}
          </Text>
          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration height={260} my={{ base: 5, sm: 10 }} />
          </m.div>
          <NextLink href="/">
            <Button
              size="lg"
              variant="solid"
              color="gray.800"
              colorScheme="caw"
            >
              {t('buttons.go_home')}
            </Button>
          </NextLink>
        </Box>
      </Container>
    </PageWrapper>
  );
}
