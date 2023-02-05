import { Text } from "@chakra-ui/react";
import type { As } from "@chakra-ui/react";

import { useMintingPageContext } from ".";
import { fDecimal } from "src/utils/formatNumber";

export default function MintingCost({ title = 'Cost:', renderComp = 'b' }: { title?: string; renderComp?: As; }) {

    const { costVerified, costUSD, costETH, costCAW } = useMintingPageContext();

    return (
        <>
            <Text as={renderComp}>{title} </Text>
            <Text>{costVerified ? fDecimal(costCAW, 2) : '--'} CAW (mCAW)</Text>
            <Text>{costVerified ? fDecimal(costETH, 6) : '--'} ETH</Text>
            <Text>{costVerified ? fDecimal(costUSD, 2) : '--'} USD</Text>
        </>
    );
}
