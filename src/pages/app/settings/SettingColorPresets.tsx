import { HStack, useToken } from "@chakra-ui/react";
import BoxMask from "./BoxMask";

export default function SettingColorPresets() {

    const [ cawColor, blueColor ] = useToken('colors', [ 'caw.500', 'blue.500' ]);

    return (
        <HStack
            spacing={4}
            w="100%"
        >
            <BoxMask
                icon="akar-icons:circle-fill"
                // bg={color}
                iconColor={cawColor}
                width="full" />
            <BoxMask
                icon="akar-icons:circle-fill"
                // bg={color}
                iconColor={blueColor}
                width="full" />
        </HStack>
    );
}
