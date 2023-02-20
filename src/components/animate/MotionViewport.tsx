import { type ReactNode } from 'react';
import { m, type MotionProps } from 'framer-motion';
import { Box, type BoxProps, useMediaQuery, useToken } from '@chakra-ui/react';
import { varContainer } from '.';


type IProps = BoxProps & MotionProps;

interface Props extends IProps {
  children: ReactNode;
  disableAnimatedMobile?: boolean;
}

export default function MotionViewport({
  children,
  disableAnimatedMobile = true,
  ...other
}: Props) {

  const mdSize = useToken('breakpoints', 'md');
  const [ isMd ] = useMediaQuery(`(min-width: ${mdSize})`)

  if (!isMd && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      as={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
