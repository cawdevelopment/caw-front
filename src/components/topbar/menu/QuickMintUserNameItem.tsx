import { useTranslation } from "react-i18next";
import { useDisclosure } from '@chakra-ui/react';

import { QuickMintingUserName } from "src/components/contract/modals/QuickMintUserName";
import MenuItem from "./MenuItem";

type Props = {
    iconColor: string;
    useIcon: boolean;
}

export default function QuickMintUserNameItem({ iconColor, useIcon }: Props) {

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem
                useIcon={useIcon}
                iconColor={iconColor}
                useLink={false}
                icon="mdi:thunder-circle"
                label={t('labels.quickmint')}
                onClick={onOpen}
            />
            <QuickMintingUserName isOpen={isOpen} onClose={onClose} />
        </>
    );
}
