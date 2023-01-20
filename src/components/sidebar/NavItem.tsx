import { usePathname } from "next/navigation";
import NextLink from 'next/link'
import { Flex, FlexProps, Text, useColorModeValue, useToken } from '@chakra-ui/react';

import Iconify from 'src/components/icons/Iconify';

export interface NavItemProps extends FlexProps {
    icon: string;
    name: string;
    link: string;

}

export default function NavItem({ icon, link, name, ...rest }: NavItemProps) {

    const pathname = usePathname();
    const selected = pathname === link;
    const [ iconColor ] = useToken('colors', [ 'caw.600' ]);
    const bg = useColorModeValue('cawAlpha.400', 'cawAlpha.300');
    const hoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
    const bgSel = useColorModeValue('caw.400', 'caw.900');
    const textColor = useColorModeValue('gray.700', 'gray.50');
    const textColorSelected = useColorModeValue('gray.600', 'caw.800');

    return (
        <NextLink
            passHref
            href={link}
            style={{ textDecoration: 'none' }}
        >
            <Flex
                id={"nav-item-" + name}
                align="center"
                p="3"
                m="3"
                gap="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                bg={selected ? bg : 'inherit'}
                _hover={{
                    bg: selected ? bgSel : hoverBg,
                }}
                {...rest}
            >
                <Iconify icon={icon} width={24} height={24} color={selected ? iconColor : undefined} />
                <Text                    
                    color={selected ? textColorSelected : textColor}
                    fontWeight={selected ? 'bold' : 'normal'}
                >
                    {name}
                </Text>
            </Flex>
        </NextLink >
    );
}
