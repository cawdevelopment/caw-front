import { useEffect } from "react";

import StatSummary from 'src/components/Stat';
import { useAsync } from 'src/hooks';
import { getCawPriceInUsd } from 'src/hooks/contracts/helper';
import { tokenPriceSS } from "src/utils/formatNumber";

type Props = {
    watch: boolean;
}

export default function CawCurrentPrice({ watch }: Props) {

    const { execute, value: cawPrice } = useAsync(getCawPriceInUsd, false);

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
    }, [ cawPrice, watch, execute ]);

    const priceFormated = `$${tokenPriceSS(Number(cawPrice || 0), 12)}`;

    return (
        <StatSummary
            label={"CAW"}
            value={priceFormated || "..."}
            showIndicator={false}
            indicatorType={"increase"}
            indicatorValue={""}
        />
    );
}