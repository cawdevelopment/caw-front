import { useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import BoxMask from "./BoxMask";

export default function SettingFullscreen() {

    const { t } = useTranslation();
    const [ fullscreen, setFullscreen ] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreen(false);
        }
    };

    return (
        <HStack
            spacing={4}
            w="100%"
        >
            <BoxMask
                icon={fullscreen ? "ic:round-fullscreen-exit" : "ic:round-fullscreen"}
                text={fullscreen ? t('labels.exit_fullscreen') : t('labels.fullscreen')}
                width="full"
                onClick={toggleFullScreen} />

            <Box sx={{ flexGrow: 1 }} />
        </HStack>
    );
}
