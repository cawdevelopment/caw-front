import { forwardRef } from 'react';
import NextLink from 'next/link';
import { BoxProps, Image } from "@chakra-ui/react";

interface Props extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<any, Props>(({ disabledLink = false, sx }, ref) => {

  const logo = (
    <Image
      boxSize='40px'
      objectFit='cover'
      src="/logo/logo_single.png"
      alt="logo"
      sx={{
        cursor: 'pointer',
      }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

Logo.displayName = 'Logo';
export default Logo;
