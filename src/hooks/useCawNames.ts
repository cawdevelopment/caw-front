import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";

import { CONTRACT_ERR_NOT_INIT } from 'src/utils/constants';
import { getContract, getSignerContract } from "./contractHelper";
import useAppConfigurations from './useAppConfigurations';

export type UserTokenModel = {
    id: number;
    name: string;
    balance: number;
}

export default function useCawNamesContract() {

    const { t } = useTranslation();
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);
    const { keys: { INFURA_API_KEY }, network, contracts: { CAW_NAME } } = useAppConfigurations();
    const { address, abi } = CAW_NAME;

    useEffect(() => {
        const { contract } = getContract({ address, abi, network, apiKey: INFURA_API_KEY });
        setContract(contract);
    }, [ address, abi, network, INFURA_API_KEY ]);


    const _getSignerContract = (walletAddress: string) => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        if (!window || !window.ethereum)
            throw new Error((t('errors.install_wallet')));

        return getSignerContract(contract, walletAddress);
    }

    const getTokenURI = async (tokenId: number) => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const data = await contract.tokenURI(tokenId);
        const json = JSON.parse(atob(data.split(',')[ 1 ]));
        const { name, description, image } = json || {};

        return { name, description, image };
    }

    const getTokens = (address: string): UserTokenModel[] => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const tokens = contract.tokens(address);

        const tokensArray: UserTokenModel[] = tokens.map((token: any) => ({
            id: token[ 0 ],
            balance: token[ 1 ],
            name: token[ 2 ],
        }));

        return tokensArray;
    }

    const mint = async (sender: string, userWalletAddress: string, userName: string, newId: number) => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const contractWithSigner = await _getSignerContract(userWalletAddress);
        const tx = await contractWithSigner.mint(sender, userName, newId);
        const receipt = await tx.wait();

        return { tx, receipt };
    }


    return {
        initialized: !!contract,
        read: {
            getTokenURI,
            getTokens
        },
        write: {
            mint
        }
    }
}