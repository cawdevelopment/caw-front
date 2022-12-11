import { Text, As } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { fDecimal } from "src/utils/formatNumber";

export function MintingCost({ title = 'Cost:', renderComp = 'b' }: { title?: string; renderComp?: As; }) {

    const { watch } = useFormContext();
    const { costVerified, costUSD, costETH, costCAW } = watch();

    return (
        <>
            <Text as={renderComp}>{title} </Text>
            <Text>{costVerified ? fDecimal(costCAW, 2) : '--'} CAW (mCAW)</Text>
            <Text>{costVerified ? fDecimal(costETH, 6) : '--'} ETH</Text>
            <Text>{costVerified ? fDecimal(costUSD, 2) : '--'} USD</Text>
        </>
    );
}
