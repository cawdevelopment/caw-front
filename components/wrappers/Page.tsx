import Head from 'next/head';
import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

import Layout from 'layouts'
import { slugify } from 'utils/helper';

export { Layout };

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => {

  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <>
      <Head>
        <title>{`${title} | CAW`}</title>
        <meta
          name="description"
          content="Caw is an Decentralized Social Clearing House that allows you to post and share your thoughts and ideas with the world and get rewarded for it."
        />
        <link rel="icon" href="/favicon/favicon.ico" />
        {meta}
      </Head>

      <Box
        ref={ref} {...other}
        id={`page-wrapper-${slugify(title)}`}
        bg={bg}
      >
        {children}
      </Box>
    </>
  )
});

Page.displayName = 'PageWrapper';
export default Page;
