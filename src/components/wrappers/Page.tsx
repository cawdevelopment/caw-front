import Head from 'next/head';
import { forwardRef, type ReactNode } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

import { iBoxProps } from "src/components/Interface.Props";
import { APP_NAME, APP_DESCRIPTION, DEFAULT_OG } from 'src/utils/constants'
import Layout from 'src/layouts'
import { slugify } from 'src/utils/helper';

export { Layout };

interface Props extends iBoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
  description?: string;
  ogImage?: string;
}

export function MetaTags({ title, description = APP_DESCRIPTION }: { title: string, description?: string }) {

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />
      <meta
        name="description"
        content={description?.length > 0 ? description : APP_DESCRIPTION}
      />
      <meta name="keywords" content="social network, community, decentralized social network, ethereum, blockchain, web3, share to rewards" />
      <meta name="author" content="Teh CAWMmunity" />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link rel="icon" href="/favicon/favicon.ico" />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#f7c034" />
      <meta name="generator" content="Next JS 13.1.1" />

      <meta data-react-helmet="true" name="description" content={description} />
      <meta data-react-helmet="true" property="og:image" content={DEFAULT_OG} />
      <meta data-react-helmet="true" property="twitter:image" content={DEFAULT_OG} />
      <meta data-react-helmet="true" property="og:type" content="website" />
      <meta data-react-helmet="true" property="og:url" content="https://teh-eyes.vercel.app/" />
      <meta data-react-helmet="true" property="og:title" content={APP_NAME} />
      <meta data-react-helmet="true" property="og:description" content={description} />
      <meta data-react-helmet="true" property="twitter:card" content="summary_large_image" />
      <meta data-react-helmet="true" property="twitter:url" content="https://teh-eyes.vercel.app/" />
      <meta data-react-helmet="true" property="twitter:title" content={APP_NAME} />
      <meta data-react-helmet="true" property="twitter:description" content={description} />


      <meta property="og:url" content="https://teh-eyes.vercel.app/" />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={DEFAULT_OG} />
      <meta property="og:image" content="https://caw.is/assets/images/180x180.png" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:locale:alternate" content="pl_PL" />
      <meta property="og:locale:alternate" content="es_ES" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={APP_NAME} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={DEFAULT_OG} />
      <meta property="twitter:image:src" content={DEFAULT_OG} />
      <meta property="twitter:image:width" content="400" />
      <meta property="twitter:image:height" content="400" />
      <meta name="twitter:image:alt" content="CAW" />
      <meta property="twitter:creator" content="CommunityCaw" />
      <meta name="twitter:site" content="@CommunityCaw" />
    </>
  );
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', description = APP_DESCRIPTION, ogImage = DEFAULT_OG, meta, ...other }, ref) => {

  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <>
      <Head>
        <title>{`${title} | ${APP_NAME}`}</title>
        <meta name="description" content={description} />

        <MetaTags title={title} description={description} />
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
