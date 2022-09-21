import {
  Divider,
  Flex,
  Input,
  Box,
  Avatar,
  HStack,
  VStack,
} from "@chakra-ui/react";
import RightSearchBar from "/components/RightSearchBar";
import Post from "/components/Post";
import CawBox from "/components/CawBox";

const fakePosts = Array(20).fill(<Post />);

const Home = () => {
  return (
    <>
      <Flex flexDirection="column" overflowY="scroll" w="300vw">
        <CawBox />
        <Divider />
        {fakePosts.map((post) => (
          <>
            {post}
            <Divider />
          </>
        ))}
      </Flex>

      <RightSearchBar />
    </>
  );
};

export default Home;
