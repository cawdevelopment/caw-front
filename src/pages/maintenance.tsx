import NextLink from 'next/link';
import { Button, Heading, Text, Container, useColorModeValue } from '@chakra-ui/react';

import { useTranslation } from 'src/hooks';
import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import MaintenanceIllustration from 'src/assets/illustration_maintenance';

Maintenance.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};

export default function Maintenance() {

  const { t } = useTranslation();
  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <PageWrapper title={t('maintenance_page.title')}>
      <Container w="full" maxW={"container.xl"} h="container.lg" p={10} bg={bg}>
        <Container sx={{ textAlign: 'center' }}>
          <Heading variant="h3" p={3}>
            {t('maintenance_page.title')}
          </Heading>
          <Text color='gray.600' p={3}>
            {t('maintenance_page.description')}
          </Text>
          <MaintenanceIllustration height={240} my={{ base: 5, sm: 10 }} />
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
        </Container>
      </Container>
    </PageWrapper>
  );
}
