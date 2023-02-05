import { type ReactNode } from "react";
import { Box, type SystemStyleObject, Text, useColorModeValue } from '@chakra-ui/react';

export type BlockProps = {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    sx?: SystemStyleObject
    sxContainer?: SystemStyleObject
};


export default function Block({ title, subtitle, sxContainer = { p: 8 }, sx = { p: 5 }, children }: BlockProps) {

    const bg = useColorModeValue('gray.200', 'whiteAlpha.50');
    const textColor = useColorModeValue('gray.600', 'gray.50');
    const borderColor = useColorModeValue('gray.100', 'gray.700');

    return (

        <Box
            borderRadius={"lg"}
            borderWidth={1}
            borderStyle={'solid'}
            borderColor={borderColor}
            bg={bg}
            sx={{
                ...sxContainer,
            }}
        >
            {title && <Box
                mt='1'
                fontWeight='semibold'
                as='h3'
                lineHeight='tight'
            >
                {title}
                <Text
                    fontSize="sm"
                    color={textColor}
                    noOfLines={1}
                >
                    {subtitle}
                </Text>
            </Box>}
            <Box
                sx={{
                    ...sx,
                    minHeight: 180,
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > *': { mx: 1 },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
