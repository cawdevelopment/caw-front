import { HStack } from "@chakra-ui/react";
import BoxMask from "./BoxMask";

export default function SettingDirection() {

    return (
        <HStack
            spacing={4}
            w="100%"
        >
            <BoxMask
                icon="ph:align-left-duotone"
                width="full" />
            <BoxMask
                icon="ph:align-right-duotone"
                width="full" />
        </HStack>
    );
}
