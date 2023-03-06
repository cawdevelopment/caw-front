import { useDisclosure } from '@chakra-ui/react';
import dynamic from "next/dynamic";

import MenuItem from "./MenuItem";

const ProtocolCostModal = dynamic(() => import("src/components/contract/modals/ProtocolCostModal"), { ssr: false });

type Props = {
    iconColor: string;
    useIcon: boolean;
}

export default function CalculatorItem({ iconColor, useIcon }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <MenuItem
                useIcon={useIcon}
                iconColor={iconColor}
                useLink={false}
                icon="mdi:file-table-box"
                label="Calc"
                onClick={onOpen} />
            <ProtocolCostModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
