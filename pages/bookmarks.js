import Image from "next/image";
import {
  SlideFade,
  VStack,
  SimpleGrid,
  Text,
  Center,
  keyframes,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0) translateY(50%); border-radius: 20%; opacity:0; }
  100% { transform: scale(1) rotate(0) translateY(0); border-radius: 20%; opacity:1;}
`;
const animation = `${animationKeyframes} 3s cubic-bezier(0.5, 1, 0.5, 1) .5s forwards`;
const animation2 = `${animationKeyframes} 3s cubic-bezier(0.5, 1, 0.5, 1) 1.5s forwards`;
const Home = () => {
  return (
    <>
      <Center>
        <Box>
          <VStack>
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="9xl"
              fontWeight="extrabold"
              opacity="0"
              as={motion.div}
              animation={animation}
            >
              Bookmarks
            </Text>
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
              p="9"
              align="center"
              opacity="0"
              as={motion.div}
              animation={animation2}
            >
              Sed mattis fermentum arcu, eget luctus est faucibus sit amet.
              Phasellus consectetur eleifend quam, bibendum pulvinar nisl
              consequat nec. Nulla fermentum leo rhoncus quam pellentesque, ac
              venenatis ipsum mollis. In massa est, convallis quis magna eu,
              ultricies molestie leo. Pellentesque semper est sit amet neque
              volutpat pretium. Praesent nibh neque, fermentum eu lacus id,
              feugiat tristique felis. Fusce lacinia mi in ultricies
              consectetur. Donec porttitor venenatis sem sit amet varius.
            </Text>
          </VStack>
        </Box>
      </Center>

      <SimpleGrid p={4} columns={[null, 1, 2, 3]} spacing={10}></SimpleGrid>
    </>
  );
};

export default Home;
