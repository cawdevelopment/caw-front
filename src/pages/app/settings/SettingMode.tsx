import { HStack, useColorMode, useToken } from "@chakra-ui/react";
import BoxMask from "./BoxMask";

export default function SettingMode() {

    const [ icColorLight, icColorDark ] = useToken('colors', [ 'caw.500', 'gray.100' ]);
    const [ bgLight, bgDark ] = useToken('colors', [ 'gray.50', 'gray.800' ]);
    const { setColorMode } = useColorMode();

    return (
        <HStack
            spacing={4}
            w="100%"
        >
            <BoxMask
                icon="ph:sun-duotone"
                bg={bgLight}
                iconColor={icColorLight}
                width="full"
                onClick={() => setColorMode('light')} />
            <BoxMask
                icon="ph:moon-duotone"
                bg={bgDark}
                iconColor={icColorDark}
                width="full"
                onClick={() => setColorMode('dark')} />
        </HStack>
    );
}
