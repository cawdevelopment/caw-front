import { ethers, utils } from "ethers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSigner } from "wagmi";

import useAppConfigurations from 'src/hooks/useAppConfigurations';
import { CONTRACT_ERR_NOT_INIT } from 'src/utils/constants';
import { getContract } from "./helper";

//* Contract name :  MintableCAW
//* Swap ETH to mCAW
export default function useMintableCAWContract() {

    const { t } = useTranslation();
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);
    const { allowMainnet, keys: { INFURA_API_KEY }, network, contracts: { MINTABLE_CAW, CAW_NAME_MINTER } } = useAppConfigurations();
    const { address, abi } = MINTABLE_CAW;
    const { address: spenderAddress } = CAW_NAME_MINTER;

    const { data: signer, isError: isSignerError, isLoading: loadingSigner } = useSigner();

    useEffect(() => {
        const { contract } = getContract({ address, abi, network, apiKey: INFURA_API_KEY });
        setContract(contract);
    }, [ address, abi, network, INFURA_API_KEY ]);


    // const [ mintArgs, setMintArgs ] = useState<any[] | undefined>(undefined);

    // const { config, isLoading } = usePrepareContractWrite({
    //     address: address,
    //     abi: abi,
    //     functionName: 'mint',
    //     args: mintArgs,
    // });

    // const { data: mintData, isLoading: isMintLoading, isSuccess: isMintStarted, write } = useContractWrite({
    //     ...config,
    //     onError(error: any) {
    //         console.error('useContractWrite.Error', error)
    //     },
    //     onMutate({ args, overrides }) {
    //         console.log('useContractWrite.Mutate', { args, overrides })
    //     },
    //     onSuccess(data) {
    //         console.log('useContractWrite.Success', data)
    //     },
    //     onSettled(data, error) {
    //         console.log('useContractWrite.Settled', data, error)
    //         setMintArgs(undefined);
    //     }
    // });

    // useEffect(() => {

    //     try {

    //         if (!mintArgs)
    //             return;

    //         console.log('Minting using args', mintArgs);
    //         write?.();
    //     }
    //     catch (error: any) {
    //         console.error("minting error : ", error);
    //         throw new Error(error);
    //     }

    // }, [ mintArgs, write ]);


    // const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({ confirmations: 1, hash: mintData?.hash });


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

    const _getSignerContract = () => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        if (!allowMainnet)
            throw new Error((t('errors.mainnet_not_allowed')));

        if (!signer || isSignerError || loadingSigner)
            throw new Error((t('errors.signer_not_found')));

        return contract.connect(signer);
    }


    const mint = async (userAddress: string, amount: number) => {

        const contractWithSigner = _getSignerContract();
        const tx = await contractWithSigner.mint(userAddress, utils.parseEther(amount.toString()));
        const receipt = await tx.wait();
        return { tx, receipt };
    }

    const approve = async (userAddress: string, amount: number) => {
        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const contractWithSigner = _getSignerContract();
        const tx = await contractWithSigner.approve(spenderAddress, utils.parseEther(amount.toString()));
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

