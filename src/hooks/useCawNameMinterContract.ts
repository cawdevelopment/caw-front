import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ethers, utils } from "ethers";
import { useWaitForTransaction } from "wagmi";

import { CONTRACT_ERR_NOT_INIT } from 'src/utils/constants';
import { getCawPriceInUsd, getContract, getSignerContract, getEthPriceInUsd } from "./contractHelper";
import useAppConfigurations from './useAppConfigurations';


export default function useCawNameMinterContract() {

    const { t } = useTranslation();
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);
    const { network, keys: { INFURA_API_KEY }, contracts: { CAW_NAME_MINTER } } = useAppConfigurations();
    const { address, abi } = CAW_NAME_MINTER;
    const [ minting, setMinting ] = useState(false);

    const [ tx, setTx ] = useState<ethers.providers.TransactionResponse | null>(null);
    const [ receipt, setReceipt ] = useState<ethers.providers.TransactionReceipt | null>(null);
    const { data, isError, isLoading } = useWaitForTransaction({ hash: tx?.hash });

    useEffect(() => {
        const { contract } = getContract({ address, abi, network, apiKey: INFURA_API_KEY });
        setContract(contract);
    }, [ address, abi, network, INFURA_API_KEY ]);


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

    const _getSignerContract = (walletAddress: string) => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        if (!window || !window.ethereum)
            throw new Error((t('errors.install_wallet')));

        return getSignerContract(contract, walletAddress);
    }

    const mint = async (username: string, walletAddress: string) => {

        try {

            const contractWithSigner = await _getSignerContract(walletAddress);

            setMinting(true);
            const tx = await contractWithSigner.mint(username);
            console.log(`🐛  -> 🔥 :  mint 🔥 :  tx`, tx);
            setTx(tx);
            const receipt = await tx.wait();
            setMinting(false);

            console.log(`🐛  -> 🔥 :  mint 🔥 :  receipt`, receipt);
            return {
                tx,
                receipt
            };

        } catch (error) {
            setMinting(false);
            throw error;
        }
    }

    function restart() {
        setTx(null);
        setReceipt(null);
        setMinting(false);
    }

    return {
        initialized: !!contract,
        minting,
        tx,
        receipt,
        data,
        isError,
        isLoading,
        getCostOfName,
        getIdByUserName,
        isValidUsername,
        mint,
        restart
    }
}