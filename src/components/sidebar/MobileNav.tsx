import { IconButton, Flex, useColorModeValue, FlexProps } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import Logo from "src/components/Logo";
import { TopBarMenu } from "src/components/topbar/TopBarMenu";


export interface MobileProps extends FlexProps {
    onOpen: () => void;
}

export function MobileNav({ onOpen, ...rest }: MobileProps): JSX.Element {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
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
            <TopBarMenu />
        </Flex>
    );
}
