import { Center, Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function LoaderCard() {
    return (
        <Center py={12}>
            <Box padding='6' boxShadow='lg' bg='white' w={'full'} maxW={'330px'}>
                <Skeleton size='10' height={'230px'} fadeDuration={1} />
                <SkeletonText mt='3' noOfLines={1} spacing='4' skeletonHeight='2' fadeDuration={1} />
                <SkeletonText mt='3' noOfLines={4} spacing='4' skeletonHeight='2' fadeDuration={1} />
            </Box>
        </Center>
    );
}
