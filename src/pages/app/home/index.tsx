import { Box, Heading, HStack, Input, InputGroup, InputRightElement, StackDivider, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import Iconify from "src/components/icons/Iconify";

const WallPost = dynamic(() => import("src/blocks/wall"), { ssr: false });

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard" >{page}</Layout>;
};

export default function HomePage() {

  const { t } = useTranslation();
  const borderRightColor = useColorModeValue('gray.400', 'gray.700');

  return (
    <PageWrapper title="Home">
      <HStack
        w="100%"
        alignItems="baseline"
        alignContent="baseline"
        divider={<StackDivider borderColor={borderRightColor} borderRightStyle="dashed" display={{ xl: 'inherit', base: 'none' }} />}
      >
        <Box w={{ base: '100%', xl: '85%' }}>          
          <Heading
            as='h4'
            size='xl'
            textAlign={"left"}
          >
            {t('app_home.wall_title')}
          </Heading>
          <Box m={4} display={{ base: 'block', xl: 'none' }}>
            <SearchCawInput />
          </Box>
          <WallPost />
        </Box>
        <Box w={{ base: '100%', xl: '15%' }} display={{ xl: 'block', base: 'none' }}>
          <SearchCawInput />
        </Box>
      </HStack>
    </PageWrapper>
  );
}

function SearchCawInput() {
  return (
    <InputGroup>
      <Input
        placeholder='Search CAW'
        variant='filled'
        size={"lg"}
        h={12}
      />
      <InputRightElement alignItems={"end"}>
        <Iconify icon="ci:search" />
      </InputRightElement>
    </InputGroup>
  );
}
