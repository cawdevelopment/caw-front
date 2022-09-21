import {
  Box,
  Badge,
  Center,
  Flex,
  VStack,
  Icon,
  Text,
  ButtonGroup,
  Button,
  Link as ChakraLink,
  Span,
  Divider,
  Show,
  Hide,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import {
  HiOutlineHashtag,
  HiOutlineBookmark,
  HiPencil,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import { FaConnectdevelop, FaListUl } from "react-icons/fa";

import { useEffect, useState } from "react";

//Left Side Header - Every Page
const RightSearchBar = ({ children }) => {
  return (
    <>
      <Divider orientation="vertical" height="auto" />

      <Flex flexDirection="column" alignContent="center" width="100vw">
        <Input m="10" placeholder="Search Caw"></Input>

        <Box
          m="10"
          maxW="m"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          _hover={{
            background: "white",
            color: "teal.500",
            transition: "all 0.7s",
            transform: "scale(1.03)",
            borderWidth: " 3px",
          }}
        >
          <Box display="flex" flexDirection="row" alignItems="baseline" p="1">
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  New
                </Badge>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  Fake News
                </Box>
              </Box>

              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                For Sure
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Box w="70vw" />
    </>
  );
};

export default RightSearchBar;
