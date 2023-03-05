import { Container, Spacer } from "@chakra-ui/react";

import { useTranslation } from 'src/hooks';
import PageWrapper, { Layout } from "src/components/wrappers/Page"
import { MotionLazyContainer } from "src/components/animate";
import HeroSection from "src/blocks/home/HeroSection";
import PoweredSection from "src/blocks/home/PoweredSection";
import EconomySection from "src/blocks/home/EconomySection";
import CardParallaxSection from "src/blocks/home/CardParallaxSection";

// const HeroSection = lazy(() => import('src/sections/home/HeroSection'));
// const PoweredSection = lazy(() => import('src/sections/home/PoweredSection'));
// const EconomySection = lazy(() => import('src/sections/home/EconomySection'));
// const CardParallaxSection = lazy(() => import('src/sections/home/CardParallaxSection'));

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing" >{page}</Layout>;
};

export default function HomePage() {

  const { t } = useTranslation();

  return (
    <PageWrapper title={t('home.page_title')}>
      <MotionLazyContainer>     
        <CardParallaxSection />
        <Container
          w="full"
          maxW={"container.xl"}
        >
          <HeroSection />
        </Container>
        <Spacer />
        <PoweredSection />
        <Container w="full" maxW={"container.xl"}>
          <EconomySection />
        </Container>
      </MotionLazyContainer>
    </PageWrapper >
  );
}
