import { Flex, FlexProps, Link, Text, useColorModeValue } from '@chakra-ui/react';
import Iconify from 'components/icons/Iconify';
import { useRouter } from "next/router";

export interface NavItemProps extends FlexProps {
    icon: string;
    name: string;
    link: string;
}

export function NavItem({ icon, link, name, ...rest }: NavItemProps) {

    const { pathname } = useRouter();
    const selected = pathname === link;
    const bg = useColorModeValue('caw.100', 'caw.800');
    const hoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
    const bgSel = useColorModeValue('caw.400', 'caw.900');
    const textColor = useColorModeValue('gray.700', 'gray.50');

    return (
        <Link href={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
                <Iconify icon={icon} width={24} height={24} />
                <Text
                    color={textColor}
                    fontWeight={selected ? 'bold' : 'normal'}
                >
                    {name}
                </Text>
            </Flex>
        </Link >
    );
}
