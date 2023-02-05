import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Text, Checkbox, Link, chakra, useColorModeValue } from "@chakra-ui/react";

import { useMintingPageContext } from ".";

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
    const { termsAccepted, setValue } = useMintingPageContext();
    const [ checkedItems, setCheckedItems ] = useState(warnings.map(c => termsAccepted));
    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
    const bgCheckBox = useColorModeValue('gray.600', 'gray.300');

    const handleCheckAll = (e: any) => {

        setCheckedItems((prev) => {

            const newCheckedItems = prev.map(() => e.target.checked);
            const newAllChecked = newCheckedItems.every(Boolean);

            setValue('termsAccepted', newAllChecked);

            return newCheckedItems;
        });
    }

    const handleCheck = (index: number) => (e: any) => {

        setCheckedItems((prev) => {

            const newCheckedItems = prev.map((c, i) => i === index ? e.target.checked : c);
            const newAllChecked = newCheckedItems.every(Boolean);

            setValue('termsAccepted', newAllChecked);

            return newCheckedItems;
        });
    }

    return (
        <chakra.div pt={5}>
            <Text pb={2}>
                {t('minting_page.user_acceptance_title')}
            </Text>
            <Checkbox
                borderColor={bgCheckBox}
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={handleCheckAll}
            >
                {t('minting_page.user_acceptance_mchk_1')} <Link color={'blue.400'}><b>{`${t('minting_page.user_acceptance_mchk_dapp')} `}</b></Link>{t('minting_page.user_acceptance_mchk_2')}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {warnings.map((caption, index) => (
                    <Checkbox
                        key={caption}
                        borderColor={bgCheckBox}
                        isChecked={checkedItems[ index ]}
                        onChange={handleCheck(index)}
                    >
                        {t(`minting_page.${caption}`)}
                    </Checkbox>
                ))}
            </Stack>
        </chakra.div>
    );
}

