import { useEffect, useState, useCallback } from "react";

import { WalletBalanceModel } from "src/types/dtos";
import { WalletBalanceInterface } from "src/interface/WalletBalanceInterface";
import useAppConfigurations from "./useAppConfigurations";

type Props = {
    connected: boolean;
    address: string;
    chainId: number;
    chainName: string;
}

export default function useAccountBalance({ address, connected, chainId, chainName }: Props) {

    const [ assets, setAssets ] = useState<WalletBalanceModel[]>(WalletBalanceInterface.DEFAULT_BALANCE);
    const [ processing, setProcessing ] = useState<boolean>(false);
    const { provider } = useAppConfigurations();

    useEffect(() => {

        if (!connected || !address)
            setAssets(() => WalletBalanceInterface.DEFAULT_BALANCE);

    }, [ connected, address ]);

    const fetchBalance = useCallback(async () => {
        try {

            if (!address || !chainId || !chainName) {
                setAssets(() => WalletBalanceInterface.DEFAULT_BALANCE);
                return;
            }

            setProcessing(true);
            const accountBalance = new WalletBalanceInterface(address, chainId, chainName, provider);

            const eth_prom = accountBalance.getEthBalance();
            const caw_prom = accountBalance.getCawBalance();
            const mcaw_prom = accountBalance.getMintableCawBalance();

            const [ eth, caw, mcaw ] = await Promise.all([ eth_prom, caw_prom, mcaw_prom ]);

            setAssets((prev) => prev.map(asset => {

                if (asset.symbol === 'ETH') {
                    asset.amount = eth;
                }

                if (asset.symbol === 'CAW') {
                    asset.amount = caw;
                }

                if (asset.symbol === 'mCAW') {
                    asset.amount = mcaw;
                }

                return asset;
            }));

            setProcessing(false);
        }
        catch (error) {
            console.log('Error: ', error);
            setAssets(() => WalletBalanceInterface.DEFAULT_BALANCE);
            setProcessing(false);
        }
    }, [ address, chainId, chainName, provider ]);


    useEffect(() => {
        fetchBalance();
    }, [ fetchBalance ]);

    return {
        assets,
        processing,
    }
}