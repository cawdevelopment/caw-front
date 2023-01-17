import { useEffect } from "react";

import StatSummary from 'src/components/Stat';
import { useAsync } from 'src/hooks';
import { fCurrency } from 'src/utils/formatNumber';
import { getEthPriceInUsd } from 'src/hooks/contracts/helper';

type Props = {
    watch: boolean;
}

export default function CawCurrentPrice({ watch }: Props) {

    const { execute, value: ethPrice } = useAsync(getEthPriceInUsd, false);

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
    }, [ ethPrice, watch, execute ]);


    return (
        <StatSummary
            label={"ETH"}
            value={fCurrency(ethPrice || 0)}
            showIndicator={false}
            indicatorType={"decrease"}
            indicatorValue={""}
        />
    );
}