import { useDisclosure } from '@chakra-ui/react';

import { ProtocolCostModal } from "src/components/contract/stats/ProtocolCost";
import MenuItem from "./MenuItem";

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
                label="Calculator"
                onClick={onOpen} />
            <ProtocolCostModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
