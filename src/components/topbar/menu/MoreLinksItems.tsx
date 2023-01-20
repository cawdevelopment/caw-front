import { useTranslation } from "react-i18next";
import { useDisclosure } from '@chakra-ui/react';
import dynamic from "next/dynamic";

import MenuItem from "./MenuItem";

const UsefulLinksModal = dynamic(() => import("src/components/contract/modals/UsefulLinksModal"), { ssr: false });

type Props = {
    iconColor: string;
    useIcon: boolean;
}

export default function MoreLinksItems({ iconColor, useIcon }: Props) {

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem
                useIcon={useIcon}
                iconColor={iconColor}
                useLink={false}
                icon="mdi:link-box-variant"
                label={t('labels.linksmenu')}
                onClick={onOpen}
            />
            <UsefulLinksModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
