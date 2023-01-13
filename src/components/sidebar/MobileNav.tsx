import { IconButton, Flex, useColorModeValue, FlexProps, useToken } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import Logo from "src/components/Logo";
import TopBarMenuButton from "src/components/topbar/menu";


export interface MobileProps extends FlexProps {
    onOpen: () => void;
}

export default function MobileNav({ onOpen, ...rest }: MobileProps): JSX.Element {

    const bg = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.50', 'gray.50');
    const [ icLight, icDark ] = useToken('colors', [ 'gray.500', 'gray.500' ]);
    const menuItemIconColor = useColorModeValue(icLight, icDark);

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={bg}
            borderBottomWidth="1px"
            borderBottomColor={borderColor}
            justifyContent="space-between"
            {...rest}
        >
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<HamburgerIcon />}
            />
            <Logo disabledLink={false} />
            <TopBarMenuButton
                iconColor={textColor}
                textColor={textColor}
                itemIconColor={menuItemIconColor}
            />
        </Flex>
    );
}
