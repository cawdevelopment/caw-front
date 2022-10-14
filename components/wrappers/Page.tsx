import Head from 'next/head';
import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import Layout from 'layouts'

export { Layout };

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
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

    <Box ref={ref} {...other} id={`page-wrapper-${title}`}>
      {children}
    </Box>
  </>
));

Page.displayName = 'PageWrapper';
export default Page;
