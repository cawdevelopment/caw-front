import { ethers, utils } from "ethers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Address, useSigner, useWaitForTransaction } from "wagmi";

import useAppConfigurations from 'src/hooks/useAppConfigurations';
import { CONTRACT_ERR_NOT_INIT } from 'src/utils/constants';
import { getContract, mapContractReceipt } from "./helper";

//* Contract name :  MintableCAW
//* Swap ETH to mCAW
type Method = 'mint' | 'approve' | 'transfer' | 'transferFrom';

type txConfirmedArgs = {
    method: Method;
    tx: ethers.ContractTransaction | undefined;
    receipt: ethers.ContractReceipt
}
type txSentArgs = {
    method: Method;
    tx: ethers.ContractTransaction;
}

type Props = {
    onBeforeSend?: (method: Method) => void;
    onTxSent?: (agrs: txSentArgs) => void;
    onTxConfirmed?: (agrs: txConfirmedArgs) => void;
    onError?: (method: Method, error: Error) => void;
    onCompleted?: (method: Method) => void;
}

export default function useMintableCAWContract(props: Props) {

    const { t } = useTranslation();
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);
    const { provider, allowMainnet, keys: { INFURA_API_KEY }, network, contracts: { MINTABLE_CAW, CAW_NAME_MINTER } } = useAppConfigurations();
    const { address, abi } = MINTABLE_CAW;
    const { address: spenderAddress } = CAW_NAME_MINTER;

    const { data: signer, isError: isSignerError, isLoading: loadingSigner } = useSigner();
    const [ operation, setOperation ] = useState<{
        tx: ethers.ContractTransaction,
        method: Method
    } | undefined>(undefined);

    useEffect(() => {
        const { contract } = getContract({ provider, address, abi, network, apiKey: INFURA_API_KEY });
        setContract(contract);
    }, [ address, abi, network, INFURA_API_KEY, provider ]);

    //!~> workaround for metamask mobile
    //! UI pitfall: when authenticated with metamask on mobile but navigating to the app from a browser.
    //! Watch for the tx confirmation and update the UI accordingly.
    useWaitForTransaction({
        hash: operation?.tx.hash as Address | undefined,
        onSuccess: (data: any) => {
            props.onTxConfirmed?.({
                method: operation?.method as Method,
                tx: operation?.tx,
                receipt: mapContractReceipt(data),
            });

            props.onCompleted?.(operation?.method as Method);
        },
        onError: (error: Error) => {
            props.onError?.(operation?.method as Method, error);
        }
    });

    const signedContract = () => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        if (!allowMainnet)
            throw new Error((t('errors.mainnet_not_allowed')));

        if (!signer || isSignerError || loadingSigner)
            throw new Error((t('errors.signer_not_found')));

        return contract.connect(signer);
    }

    const getDecimals = async () => {

        const decimals = await signedContract().decimals();
        return decimals;
    }

    const getSymbol = async () => await signedContract().symbol()

    const getName = async () => await signedContract().name()

    const getTotalSupply = async () => await signedContract().totalSupply()

    const getBalanceOf = async (address: string) => {    
        const result = await signedContract().balanceOf(address);
        const balance = utils.formatEther(result);
        return parseFloat(balance);
    }

    const mint = async (userAddress: string, amount: number) => {
        try {
            const parsedAmount = utils.parseEther(amount.toString());

            props.onBeforeSend?.('mint');
            const tx = await signedContract().mint(userAddress, parsedAmount);

            setOperation({ tx, method: 'mint' });
            props.onTxSent?.({ method: 'mint', tx });

            const receipt = await tx.wait();

            return { tx, receipt };
        }
        catch (error: any) {
            props.onError?.('mint', error);
        }
        finally {
            props.onCompleted?.('mint');
        }
    }

    const approve = async (userAddress: string, amount: number) => {  
        try {
            const parsedAmount = utils.parseEther(amount.toString());

            props.onBeforeSend?.('approve');
            const tx = await signedContract().approve(spenderAddress, parsedAmount);
            setOperation({ tx, method: 'approve' });
            props.onTxSent?.({ method: 'approve', tx });

            const receipt = await tx.wait();

            return { tx, receipt };
        }
        catch (error: any) {
            props.onError?.('approve', error);
        }
        finally {
            props.onCompleted?.('approve');
        }
    }

    const transfer = async (to: string, amount: number) => {    

        try {
            props.onBeforeSend?.('transfer');
            const tx = await signedContract().transfer(to, utils.parseEther(amount.toString()));
            setOperation({ tx, method: 'transfer' });
            props.onTxSent?.({ method: 'transfer', tx });

            const receipt = await tx.wait();

            return { tx, receipt };
        }
        catch (error: any) {
            props.onError?.('transfer', error);
        }
        finally {
            props.onCompleted?.('transfer');
        }
    }

    const transferFrom = async (from: string, to: string, amount: number) => {        

        try {

            props.onBeforeSend?.('transferFrom');
            const tx = await signedContract().transferFrom(from, to, utils.parseEther(amount.toString()));
            setOperation({ tx, method: 'transferFrom' });
            props.onTxSent?.({ method: 'transferFrom', tx });

            const receipt = await tx.wait();

            return { tx, receipt };
        }
        catch (error: any) {
            props.onError?.('transferFrom', error);
        }
        finally {
            props.onCompleted?.('transferFrom');
        }
    }

    return {
        initialized: !!contract && !!signer,
        getDecimals,
        getSymbol,
        getName,
        getTotalSupply,
        getBalanceOf,
        mint,
        approve,
        transfer,
        transferFrom,
    }
}

