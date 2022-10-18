import { useTranslation } from "react-i18next";
import { Container } from "@chakra-ui/react";

import PageWrapper, { Layout } from "components/wrappers/Page"
import { MotionLazyContainer } from "components/animate";
import HeroSection from "sections/home/HeroSection";
import PoweredSection from "sections/home/PoweredSection";
import EconomySection from "sections/home/EconomySection";

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing" >{page}</Layout>;
};

export default function HomePage() {

  const { t } = useTranslation();

  return (
    <PageWrapper title={t('home.page_title')}>
      <MotionLazyContainer>
        <Container w="full" maxW={"container.xl"}>
          <HeroSection />
        </Container>
        <PoweredSection />
        <Container w="full" maxW={"container.xl"}>
          <EconomySection />
        </Container>
      </MotionLazyContainer>
    </PageWrapper >
  );
}
