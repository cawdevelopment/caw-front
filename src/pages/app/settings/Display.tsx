import { Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import Block from "src/components/Block";
import SettingMode from "./SettingMode";
// import SettingDirection from "./SettingDirection";
// import SettingColorPresets from "./SettingColorPresets";
// import SettingFullscreen from "./SettingFullscreen";

export default function DisplaySettings() {
    const { t } = useTranslation();
    return (
        <Block
            title={t('settings_page.display')}
            subtitle={t('settings_page.display_description')}
        >
            <Stack
                id="display-settings"
                direction={{ base: 'column', sm: 'row' }}
                justifyContent="space-around"
                alignItems="baseline"
                spacing={5}
            >
                <Stack spacing={1} width='100%'>
                    <div>
                        <Text as="b">
                            {t('labels.mode')}
                        </Text>
                        <SettingMode />
                    </div>
                    {/* <div>
                        <Text as="b">
                            {t('labels.direction')}
                        </Text>
                        <SettingDirection />
                    </div> */}
                </Stack>
                {/* <Stack spacing={1} sx={{ width: '-webkit-fill-available' }} >
                    <div>
                        <Text as="b">
                            {t('labels.color_presets')}
                        </Text>
                        <SettingColorPresets />
                    </div>
                    <div>
                        <Text as="b">
                            {t('labels.layout')}
                        </Text>
                        <SettingFullscreen />
                    </div>
                </Stack> */}
            </Stack>
        </Block>
    );
}