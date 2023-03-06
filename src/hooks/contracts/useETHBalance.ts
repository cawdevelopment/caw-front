import { useCallback, useEffect, useState } from "react";
import { WalletBalanceInterface } from "src/interface/WalletBalanceInterface";
import useAppConfigurations from "../useAppConfigurations";

type Props = {
    account: string;
    chainId: number;
    chainName: string;
    onSuccess?: (balance: number, data: any) => void;
    onError?: (error: any) => void;
}

export default function useETHBalance({ account, chainId, chainName, onSuccess, onError }: Props) {

    const [ balance, setBalance ] = useState<number>(0);
    const [ fetchingETH, setFetchingETH ] = useState<boolean>(false);
    const { provider } = useAppConfigurations();

    const getEthBalance = useCallback(async () => {

        if (!account) {
            setBalance(0);
            onError && onError('Account not connected');
            return;
        }

        if (!chainId || !chainName) {
            setBalance(0);
            onError && onError('Chain not valid');
            return;
        }

        try {
            setFetchingETH(true);
            const accountBalance = new WalletBalanceInterface(account, chainId, chainName, provider);
            const bal = await accountBalance.getEthBalance();
            setBalance(() => bal);
            onSuccess && onSuccess(bal, null);
        }
        catch (error) {
            console.error(`ETH->Balance.error`, error);
            setBalance(0);
            onError && onError(error);
        }
        finally {
            setFetchingETH(false);
        }
    }, [ account, chainId, chainName, provider, onError, onSuccess ]);


    useEffect(() => {
        getEthBalance();
    }, [ getEthBalance ]);


    return {
        fetchETH: getEthBalance,
        balance,
        fetchingETH,
    };
}
