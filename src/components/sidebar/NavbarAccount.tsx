import React from "react";
import { Box, Link, Text, HStack, VStack, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

import { PATH_DASHBOARD } from 'src/routes/paths';
import Avatar from 'src/components/avatar/Avatar';
import { shortenAddress } from "src/utils/helper";
import { user } from "src/types/community-feed";

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {

  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const path = PATH_DASHBOARD.user.profile.replace(':username', user?.username || '');

  return (
    <NextLink href={path} passHref>
      <Link href={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Box
          p="3"
          m="3"
          bg={bgColor}
          borderRadius="lg"
        >
          <HStack>
            <Avatar
              name="cawfee"
              size="md"
              color="white"
              src={user?.avatar?.src}
              type={user?.avatar?.type}
            />
            <VStack alignItems="flex-start" p={0} m={0} >
              <Text noOfLines={1} as="b">
                {user?.username || ''}
              </Text>
              <Text noOfLines={1} color="gray.600" p={0} m={0} mt={0}>
                {user?.wallet ? shortenAddress(user.wallet) : '0x0...0x0'}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Link>
    </NextLink>
  );
}
