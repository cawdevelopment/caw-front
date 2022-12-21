import { Box, BoxProps, Center, useColorModeValue, useToken } from "@chakra-ui/react";
import Iconify from "src/components/icons/Iconify";

export interface BoxMaskProps extends BoxProps {
    icon: string;
    bg?: string;
    iconColor?: string;
    text?: string;
}

export default function BoxMask({ icon, text, bg, iconColor, ...others }: BoxMaskProps) {

    const color = useColorModeValue('gray.50', 'whiteAlpha.50');
    const [ bgLight, bgDark ] = useToken('colors', [ 'gray.500', 'gray.50' ]);
    const _iconColor = useColorModeValue(bgLight, bgDark);

    return (
        <Box
            {...others}
            bg={bg || color}
            p={5}
            borderRadius={"lg"}
            borderWidth="1px"
            cursor={'pointer'}
            boxShadow={'md'}
        >
            <Center>
                {text || ''}
                <Iconify
                    icon={icon}
                    width={28}
                    height={28}
                    color={iconColor || _iconColor} />
            </Center>
        </Box>
    );
}
