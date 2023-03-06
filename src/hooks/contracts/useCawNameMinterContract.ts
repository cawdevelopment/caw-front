import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ethers, utils } from "ethers";
import { Address, useSigner, useWaitForTransaction } from "wagmi";

import useAppConfigurations from 'src/hooks/useAppConfigurations';
import { CONTRACT_ERR_NOT_INIT } from 'src/utils/constants';
import { getCawPriceInUsd, getContract, getEthPriceInUsd, mapContractReceipt } from "./helper";


type Props = { 
    onBeforeSend?: () => void;
    onTxSent?: (tx: ethers.ContractTransaction) => void;
    onTxConfirmed?: (tx: ethers.ContractTransaction | undefined, receipt: ethers.ContractReceipt) => void;
    onError?: (error: Error) => void;
    onCompleted?: () => void;
}

type Method = 'mint';

//* Contract name :  CawNameMinter
//* Get the cost of a name, validate the name, and mint a NTF-Username
export default function useCawNameMinterContract({ onBeforeSend, onTxSent, onError,onCompleted,  onTxConfirmed }: Props = {}) {

    const { t } = useTranslation();
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);
    const { allowMainnet, network, provider, keys: { INFURA_API_KEY }, contracts: { CAW_NAME_MINTER } } = useAppConfigurations();
    const { address, abi } = CAW_NAME_MINTER;
    const { data: signer, isError: isSignerError, isLoading: loadingSigner } = useSigner();

    const [ operation, setOperation ] = useState<{
        tx: ethers.ContractTransaction,
        method: Method
    } | undefined>(undefined);

    //!~> workaround for metamask mobile
    //! UI pitfall: when authenticated with metamask on mobile but navigating to the app from a browser.
    //! Watch for the tx confirmation and update the UI accordingly.
    useWaitForTransaction({
        hash: operation?.tx.hash as Address | undefined,
        onSuccess: (data: any) => {
            onTxConfirmed?.(operation?.tx, mapContractReceipt(data));
            onCompleted?.();
        },
        onError: (error: Error) => {
            onError?.(error);
        }
    });

    useEffect(() => {
        const { contract } = getContract({ provider, address, abi, network, apiKey: INFURA_API_KEY });
        setContract(contract);
    }, [ address, abi, network, provider, INFURA_API_KEY ]);


    const _getSignedContract = () => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        if (!allowMainnet)
            throw new Error((t('errors.mainnet_not_allowed')));

        if (!signer || isSignerError || loadingSigner)
            throw new Error((t('errors.signer_not_found')));

        return contract.connect(signer);
    }

    const getCostOfName = async (userName: string) => {

        const cost = await _getSignedContract().costOfName(userName);
        const cawUSD = await getCawPriceInUsd();
        const ethUSD = await getEthPriceInUsd();

        const costInWei = parseFloat(utils.formatEther(cost));
        const cawToEth = cawUSD / ethUSD;
        const costInEth = costInWei * cawToEth;
        const constInUsd = costInWei * cawUSD;

        return {
            cost: costInWei,
            costInEth,
            constInUsd
        }
    }

    const getIdByUserName = async (userName: string): Promise<number> => {
        const id = await _getSignedContract().idByUsername(userName);
        const index = parseInt(id.toString());
        return index;
    }

    const isValidUsername = async (userName: string): Promise<boolean> => {
        const result = await _getSignedContract().isValidUsername(userName);
        return Boolean(result);
    }

    const mint = async (username: string) => {
        
        try {
            onBeforeSend?.();
            const tx = await _getSignedContract().mint(username);
            onTxSent?.(tx);
            setOperation({ tx, method: 'mint' });

            const receipt = await tx.wait();

            return {
                tx,
                receipt
            };
        }
        catch (error: any) {
            onError?.(error);
        }
        finally {
            onCompleted?.();
        }
    }
    
    return {
        initialized: !!contract && !!signer,
        getCostOfName,
        getIdByUserName,
        isValidUsername,
        mint
    }
}