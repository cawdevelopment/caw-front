import { ethers, utils } from "ethers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CONTRACT_ERR_NOT_INIT } from 'src/utils/constants';
import { getContract, getSignerContract } from "./contractHelper";
import useAppConfigurations from './useAppConfigurations';

export default function useMintableCAWContract() {

    const { t } = useTranslation();
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);
    const [ processig, setProcessing ] = useState(false);
    const { keys: { INFURA_API_KEY }, network, contracts: { MINTABLE_CAW } } = useAppConfigurations();
    const { address, abi } = MINTABLE_CAW;

    useEffect(() => {
        const { contract } = getContract({ address, abi, network, apiKey: INFURA_API_KEY });
        setContract(contract);
    }, [ address, abi, network, INFURA_API_KEY ]);

    const getDecimals = async () => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const decimals = await contract.decimals();
        return decimals;
    }

    const getSymbol = async () => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        return await contract.symbol();
    }

    const getName = async () => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        return await contract.name();
    }

    const getTotalSupply = async () => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        return await contract.totalSupply();
    }

    const getBalanceOf = async (address: string) => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const result = await contract.balanceOf(address);
        const balance = utils.formatEther(result);
        return parseFloat(balance);
    }

    const _getSignerContract = (walletAddress: string) => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        if (!window || !window.ethereum)
            throw new Error((t('errors.install_wallet')));

        return getSignerContract(contract, walletAddress);
    }


    const mint = async (walletAddress: string, price: number) => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);


        setProcessing(true);
        const tx = await contract.mint(walletAddress, utils.parseEther(price.toString()));
        const receipt = await tx.wait();
        setProcessing(false);
        return { tx, receipt };
    }

    const approve = async (spender: string, amount: number) => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        //* pass the contract address to the spender field
        const contractWithSigner = await _getSignerContract(address);
        const tx = await contractWithSigner.approve(spender, utils.parseEther(amount.toString()));
        const receipt = await tx.wait();
        return { tx, receipt };
    }

    const transfer = async (to: string, amount: number) => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const tx = await contract.transfer(to, utils.parseEther(amount.toString()));
        const receipt = await tx.wait();
        return { tx, receipt };
    }

    const transferFrom = async (from: string, to: string, amount: number) => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const tx = await contract.transferFrom(from, to, utils.parseEther(amount.toString()));
        const receipt = await tx.wait();
        return { tx, receipt };
    }

    return {
        initialized: !!contract,
        processig,
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

