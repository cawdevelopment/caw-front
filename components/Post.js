import { VStack, Avatar, HStack, Text, Box } from "@chakra-ui/react";

const Post = () => (
  <Box
    _hover={{
      background: "grey",
      transition: "all 0.7s",
      transform: "scale(1.005)",
    }}
  >
    <HStack display="flex" justifyContent="space-evenly">
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <VStack alignItems="flex-start">
        <Text w="calc(30vw)">Name - Handle - Timestamp</Text>
        <Text w="calc(30vw)">#Hashtags</Text>
      </VStack>
    </HStack>
    <Text p="10">
      Sed mattis fermentum arcu, eget luctus est faucibus sit amet. Phasellus
      consectetur eleifend quam, bibendum pulvinar nisl consequat nec. Nulla
      fermentum leo rhoncus quam pellentesque, ac venenatis ipsum mollis. In
      massa est, convallis quis magna eu, ultricies molestie leo. Pellentesque
      semper est sit amet neque volutpat pretium. Praesent nibh neque, fermentum
      eu lacus id, feugiat tristique felis. Fusce lacinia mi in ultricies
      consectetur. Donec porttitor venenatis sem sit amet varius.
    </Text>
  </Box>
);

export default Post;
