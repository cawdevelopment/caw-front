import Head from 'next/head';
import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

import { APP_NAME, APP_DESCRIPTION, DEFAULT_OG } from 'src/utils/constants'
import Layout from 'src/layouts'
import { slugify } from 'src/utils/helper';

export { Layout };

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
  description?: string;
  ogImage?: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', description = APP_DESCRIPTION, ogImage = DEFAULT_OG, meta, ...other }, ref) => {

  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <>
      <Head>
        <title>{`${title} | ${APP_NAME}`}</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
        <meta
          name="description"
          content={description}
        />
        <link rel="icon" href="/favicon/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#f7c034" />
        <meta property="og:url" content="https://teh-eyes.vercel.app" />
        <meta property="og:site_name" content={APP_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={DEFAULT_OG} />
        <meta property="og:image:width" content="192" />
        <meta property="og:image:height" content="192" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content={APP_NAME} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image:src" content={DEFAULT_OG} />
        <meta property="twitter:image:width" content="192" />
        <meta property="twitter:image:height" content="192" />
        <meta property="twitter:creator" content="CommunityCaw" />
        {meta}
      </Head>

      <Box        
        ref={ref} {...other}
        id={`page-wrapper-${slugify(title)}`}
        bg={bg}
        minH="100vh"
      >
        {children}
      </Box>
    </>
  )
});

Page.displayName = 'PageWrapper';
export default Page;
