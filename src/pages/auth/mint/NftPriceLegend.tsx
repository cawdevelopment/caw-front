import { Text, useColorModeValue, Link } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function NftPriceLegend() {
    const color = useColorModeValue('gray.800', 'gray.200');
    const { t } = useTranslation();
    return (
        <Text fontSize={'lg'} color={color}>
            {t('minting_page.label_cost_the')} <b>{t('minting_page.label_cost_sort')}</b> {t('minting_page.label_cost_username')}<Link color={'blue.400'}> <b>{t('minting_page.label_cost_exp')}</b></Link> {t('minting_page.label_cost_willbe')}
        </Text>
    );
}
