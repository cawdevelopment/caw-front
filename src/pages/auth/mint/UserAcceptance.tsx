import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Stack, Text, Checkbox, Link, chakra } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

//* Codes come from src/locales/[lang.json] minting_page section
export const warnings = [
    'user_acceptance_warn_1',
    'user_acceptance_warn_2',
    'user_acceptance_warn_3',
    'user_acceptance_warn_4',
    'user_acceptance_warn_5'
]

export default function UserAcceptance() {

    const { t } = useTranslation();
    const { setValue, getValues } = useFormContext();
    const termsAccepted = getValues('termsAccepted');
    const [ checkedItems, setCheckedItems ] = useState(warnings.map(c => termsAccepted));
    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    useEffect(() => {
        setValue('termsAccepted', allChecked);
    }, [ allChecked, setValue ]);

    return (
        <chakra.div pt={5}>
            <Text pb={2}>
                {t('minting_page.user_acceptance_title')}
            </Text>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems(checkedItems.map(() => e.target.checked))}
            >
                {t('minting_page.user_acceptance_mchk_1')} <Link color={'blue.400'}><b>{`${t('minting_page.user_acceptance_mchk_dapp')} `}</b></Link>{t('minting_page.user_acceptance_mchk_2')}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {warnings.map((caption, index) => (
                    <Checkbox
                        key={index}
                        isChecked={checkedItems[ index ]}
                        onChange={(e) => setCheckedItems(checkedItems.map((c, i) => i === index ? e.target.checked : c))}
                    >
                        {t(`minting_page.${caption}`)}
                    </Checkbox>
                ))}
            </Stack>
        </chakra.div>
    );
}

