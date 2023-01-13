import { Button, ButtonProps, useColorMode } from '@chakra-ui/react';
import Iconify from "src/components/icons/Iconify";

export default function ColorModeToggle(props: ButtonProps) {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            _focus={{ boxShadow: 'none' }}
            variant="ghost"
            w="fit-content"
            {...props}
        >
            {colorMode === 'light' ? <Iconify icon="material-symbols:dark-mode-rounded" /> : <Iconify icon="ic:baseline-light-mode" />}
        </Button>
    );
}