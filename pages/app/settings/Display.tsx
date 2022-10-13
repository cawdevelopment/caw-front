import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Block from "src/components/Block";
import SettingColorPresets from "src/components/settings/SettingColorPresets";
import SettingDirection from "src/components/settings/SettingDirection";
import SettingFullscreen from "src/components/settings/SettingFullscreen";
import SettingMode from "src/components/settings/SettingMode";

export default function DisplaySettings() {
    const { t } = useTranslation();
    return (
        <Block
            title={t('settings.display')}
            subtitle={t('settings.display_description')}
        >
            <Stack
                id="display-settings"
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-around"
                alignItems="baseline"
                spacing={5}
                sx={{ width: '100%' }}
            >
                <Stack spacing={1} sx={{ width: '-webkit-fill-available' }} >
                    <div>
                        <Typography variant="subtitle2">
                            {t('labels.mode')}
                        </Typography>
                        <SettingMode />
                    </div>
                    <div>
                        <Typography variant="subtitle2">
                            {t('labels.direction')}
                        </Typography>
                        <SettingDirection />
                    </div>
                </Stack>
                <Stack spacing={1} sx={{ width: '-webkit-fill-available' }} >
                    <div>
                        <Typography variant="subtitle2">
                            {t('labels.color_presets')}
                        </Typography>
                        <SettingColorPresets />
                    </div>
                    <div>
                        <Typography variant="subtitle2">
                            {t('labels.layout')}
                        </Typography>
                        <SettingFullscreen />
                    </div>
                </Stack>
            </Stack>
        </Block>
    );
}