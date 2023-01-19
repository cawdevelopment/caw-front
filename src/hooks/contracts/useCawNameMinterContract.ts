import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ethers, utils } from "ethers";
import { useSigner } from "wagmi";

import useAppConfigurations from 'src/hooks/useAppConfigurations';
import { CONTRACT_ERR_NOT_INIT } from 'src/utils/constants';
import { getCawPriceInUsd, getContract, getEthPriceInUsd } from "./helper";

type Props = { 
    onBeforeSend?: () => void;
    onTxSent?: (tx: ethers.ContractTransaction) => void;
    onTxConfirmed?: (receipt: ethers.ContractReceipt) => void;
    onError?: (error: Error) => void;
    onCompleted?: () => void;
}

//* Contract name :  CawNameMinter
//* Get the cost of a name, validate the name, and mint a NTF-Username
export default function useCawNameMinterContract({ onBeforeSend, onTxSent, onError,onCompleted,  onTxConfirmed }: Props = {}) {

    const { t } = useTranslation();
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);
    const { allowMainnet, network, provider, keys: { INFURA_API_KEY }, contracts: { CAW_NAME_MINTER } } = useAppConfigurations();
    const { address, abi } = CAW_NAME_MINTER;
    const { data: signer, isError: isSignerError, isLoading: loadingSigner } = useSigner();

    useEffect(() => {
        const { contract } = getContract({ address, abi, network, apiKey: INFURA_API_KEY , provider});
        setContract(contract);
    }, [ address, abi, network, provider, INFURA_API_KEY ]);


    const getCostOfName = async (userName: string) => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const cost = await contract.costOfName(userName);
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

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const id = await contract.idByUsername(userName);
        const index = parseInt(id.toString());
        return index;
    }

    const isValidUsername = async (userName: string): Promise<boolean> => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const result = await contract.isValidUsername(userName);
        return Boolean(result);
    }

    const _getSignerContract = () => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        if (!allowMainnet)
            throw new Error((t('errors.mainnet_not_allowed')));

        if (!signer || isSignerError || loadingSigner)
            throw new Error((t('errors.signer_not_found')));

        return contract.connect(signer);
    }


    const mint = async (username: string) => {
        
        try {
            onBeforeSend?.();
            const contractWithSigner = _getSignerContract();
            const tx = await contractWithSigner.mint(username);
            onTxSent?.(tx);

            const receipt = await tx.wait();
            onTxConfirmed?.(receipt);

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
        initialized: !!contract,
        getCostOfName,
        getIdByUserName,
        isValidUsername,
        mint
    }
}