import { m } from 'framer-motion';
import NextLink from 'next/link';
import { Box, Button, Heading, Text, Container, useColorModeValue } from '@chakra-ui/react';

import { useTranslation } from 'src/hooks';
import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import { varBounce } from 'src/components/animate';
import PageNotFoundIllustration from 'src/assets/illustration_404';

Page404.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};

export default function Page404() {

  const { t } = useTranslation();
  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <PageWrapper title={t('404_page.title')}>
      <Container w="full" maxW={"container.xl"} h="container.lg" p={10} bg={bg}>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <m.div variants={varBounce().in}>
            <Heading variant="h3" p={3}>
              {t('404_page.title')}
            </Heading>
          </m.div>
          <Text color='gray.600' p={3}>
            {t('404_page.description')}
          </Text>
          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration height={260} my={{ base: 5, sm: 10 }} />
          </m.div>
          <NextLink href="/" passHref>
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