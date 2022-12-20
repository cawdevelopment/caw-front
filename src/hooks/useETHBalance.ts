import { useEffect, useState } from "react";
import { useBalance } from "wagmi";

import { useCawProvider } from "src/context/WalletConnectContext";

export default function useETHBalance(account: string) {

    const { chain } = useCawProvider();
    const [ balance, setBalance ] = useState<number>(0);

    const { isFetching: fetchingETH, refetch } = useBalance({
        addressOrName: account, chainId: chain?.id, watch: false,
        onSuccess(data) {
            setBalance(Number(data?.formatted || 0));
        },
    });

    useEffect(() => {

        if (account && chain?.id) {
            refetch();
        }

    }, [ account, chain?.id, refetch ]);


    return { balance, fetchingETH };
}