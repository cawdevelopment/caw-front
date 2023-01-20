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
    const { provider, allowMainnet, keys: { INFURA_API_KEY }, network, contracts: { MINTABLE_CAW, CAW_NAME_MINTER } } = useAppConfigurations();
    const { address, abi } = MINTABLE_CAW;
    const { address: spenderAddress } = CAW_NAME_MINTER;

    const { data: signer, isError: isSignerError, isLoading: loadingSigner } = useSigner();

    useEffect(() => {
        const { contract } = getContract({ provider, address, abi, network, apiKey: INFURA_API_KEY });
        setContract(contract);
    }, [ address, abi, network, INFURA_API_KEY, provider ]);


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

    const signedContract = () => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        if (!allowMainnet)
            throw new Error((t('errors.mainnet_not_allowed')));

        if (!signer || isSignerError || loadingSigner)
            throw new Error((t('errors.signer_not_found')));


        console.info('Using signer : contract.signer', contract.signer ? true : false);
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
        const tx = await signedContract().mint(userAddress, utils.parseEther(amount.toString()));
        const receipt = await tx.wait();
        return { tx, receipt };
    }

    const approve = async (userAddress: string, amount: number) => {        
        const tx = await signedContract().approve(spenderAddress, utils.parseEther(amount.toString()));
        const receipt = await tx.wait();
        return { tx, receipt };
    }

    const transfer = async (to: string, amount: number) => {    
        const tx = await signedContract().transfer(to, utils.parseEther(amount.toString()));
        const receipt = await tx.wait();
        return { tx, receipt };
    }

    const transferFrom = async (from: string, to: string, amount: number) => {        
        const tx = await signedContract().transferFrom(from, to, utils.parseEther(amount.toString()));
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

