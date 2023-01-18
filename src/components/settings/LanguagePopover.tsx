import { Text, HStack, Button, Menu, MenuButton, MenuItem, MenuList, Image, useColorModeValue } from "@chakra-ui/react";
import useLocales from "src/hooks/useLocale";

type LanguagePopoverProps = {
    bgIPopover?: string;
}

export default function LanguagePopover({ bgIPopover }: LanguagePopoverProps) {

    const { allLang, currentLang, onChangeLang } = useLocales();
    const bgMenuItemHover = useColorModeValue('gray.200', 'gray.600');
    const bgMenuItem = useColorModeValue('cawAlpha.300', 'cawAlpha.300');
    const bgMenuList = useColorModeValue('gray.100', 'gray.800');

    return (
        <Menu>
            <MenuButton
                as={Button}
                size='xs'
                _focus={{ boxShadow: 'none' }}
                variant="ghost"
                    w="fit-content"                
                pl={2}
                pr={2}
                style={{
                    paddingTop: "1.3rem",
                    paddingBottom: "1.3rem",
                }}
                    borderColor="gray.300"
                    borderRadius="md"
            >

                    <Image
                        w="2rem"
                        h="auto"
                        src={currentLang.icon}
                        alt={currentLang.label}
                    />
            </MenuButton>
            <MenuList borderRadius={10} bg={bgIPopover || bgMenuList}>
                {allLang.map((lang) => (
                    <MenuItem
                        key={lang.value}
                        bg={currentLang.value === lang.value ? bgMenuItem : 'inherit'}
                        m={1}
                        p={2}
                        borderRadius={10}
                        _hover={{ bg: bgMenuItemHover }}                        
                        width='calc(100% - 0.5rem)'
                        onClick={() => onChangeLang(lang.value)}
                    >
                        <HStack spacing={2} >
                            <Image src={lang.icon} alt={lang.label} />
                            <Text>
                                {lang.label}
                            </Text>
                        </HStack>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}