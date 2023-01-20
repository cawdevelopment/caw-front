import { useTranslation } from "react-i18next";
import { useDisclosure } from '@chakra-ui/react';
import dynamic from "next/dynamic";

import MenuItem from "./MenuItem";

const BuyCawModal = dynamic(() => import("src/components/contract/modals/BuyCawModal"), { ssr: false });

type Props = {
    iconColor: string;
    useIcon: boolean;
}

export default function BuyCawItem({ iconColor, useIcon }: Props) {

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem
                useIcon={useIcon}
                iconColor={iconColor}
                useLink={false}
                icon="cib:experts-exchange"
                label={t('labels.buycaw')}
                onClick={onOpen} />
            <BuyCawModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
