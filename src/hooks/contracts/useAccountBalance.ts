import { useEffect, useState, useCallback } from "react";

import { WalletBalanceModel } from "src/types/dtos";
import { WalletBalanceInterface } from "src/interface/WalletBalanceInterface";
import useAppConfigurations from "../useAppConfigurations";

type Props = {
    connected: boolean;
    address: string;
    chainId: number;
    chainName: string;
    // onBalanceChange?: (balance: WalletBalanceModel[]) => void;
}

export default function useAccountBalance({ address, connected, chainId, chainName }: Props) {

    const [ assets, setAssets ] = useState<WalletBalanceModel[]>(WalletBalanceInterface.getInitialtBalance());
    const [ processing, setProcessing ] = useState<boolean>(false);
    const { provider } = useAppConfigurations();

    useEffect(() => {

        if (!connected || !address)
            setAssets(() => WalletBalanceInterface.getInitialtBalance());

    }, [ connected, address ]);

    // useEffect(() => {
    //     onBalanceChange?.(assets);
    // }, [ assets, onBalanceChange ]);

    const fetchBalance = useCallback(async () => {
        try {

            if (!address || !chainId || !chainName) {
                setAssets(() => WalletBalanceInterface.getInitialtBalance());
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
                    return { ...asset, amount: eth }
                }

                if (asset.symbol === 'CAW') {
                    return { ...asset, amount: caw }
                }

                if (asset.symbol === 'mCAW') {
                    return { ...asset, amount: mcaw }
                }

                return { ...asset };
            }));

            setProcessing(false);
        }
        catch (error) {
            console.log('Error: ', error);
            setAssets(() => WalletBalanceInterface.getInitialtBalance());
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