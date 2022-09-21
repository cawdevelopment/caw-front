import {
  Divider,
  Flex,
  Input,
  Box,
  Avatar,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  ChevronDownIcon,
  Text,
  Button,
} from "@chakra-ui/react";

const CawBox = () => (
  <Box display="flex" justifyContent="space-evenly" my="5">
    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
    <VStack h="calc(15vh)" alignItems="flex-start">
      <Menu>
        <MenuButton size="sm" as={Button}>
          <Text size="m" color="black">
            Who Can See
          </Text>
        </MenuButton>
        <MenuList>
          <MenuItem>Everyone</MenuItem>
          <MenuItem>Just Steve</MenuItem>
        </MenuList>
      </Menu>
      <Input w="calc(30vw)" textColor="white" placeholder="What's Happening?" />
    </VStack>
  </Box>
);
export default CawBox;
