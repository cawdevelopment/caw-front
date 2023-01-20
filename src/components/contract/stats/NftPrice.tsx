import { useEffect } from "react";

import { useAsync } from "src/hooks";
import StatSummary from 'src/components/Stat';
import { getCawPriceInUsd } from "src/hooks/contracts/helper";
import { fCurrency, superScript } from 'src/utils/formatNumber';
import { NftCostInUsdByLength } from "src/utils/manifestoHelper";
import { Tooltip } from "@chakra-ui/react";

const characterNums = 8;
const characters = superScript(characterNums);

type Props = {
    watch: boolean;
}

export default function NftPrice({ watch }: Props) {

    const { execute, status, value: price } = useAsync(getCawPriceInUsd, false);

    useEffect(() => {
        execute();
    }, [ execute ]);


    //* Update price every 1 minute
    useEffect(() => {

        if (!watch)
            return;

        const interval = setInterval(() => {
            execute();
        }, 60000);

        return () => clearInterval(interval);
    }, [ price, watch, execute ]);

    const cawCost = status === 'success' ? NftCostInUsdByLength(characterNums, price || 0) : -1;

    return (
        <Tooltip
            label={`Cost of ${characterNums} characters username at current CAW price`}
        >
            <div>
                <StatSummary
                    label={`NFT ${characters}`}
                    value={cawCost > 0 ? fCurrency(cawCost) : "..."}
                    showIndicator={false}
                    indicatorType={"decrease"}
                    indicatorValue={""}
                />
            </div>
        </Tooltip>
    );
}