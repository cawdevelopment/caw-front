import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumber, ethers } from "ethers";

import { CONTRACT_ERR_NOT_INIT } from 'src/utils/constants';
import { CawUserName } from 'src/types/dtos';
import { getContract, getSignerContract } from "./contractHelper";
import useAppConfigurations from './useAppConfigurations';


//* Contract name :  CawName
export default function useCawNamesContract() {

    const { t } = useTranslation();
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);
    const { allowMainnet, keys: { INFURA_API_KEY }, network, contracts: { CAW_NAME } } = useAppConfigurations();
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

        if (!allowMainnet)
            throw new Error((t('errors.mainnet_not_allowed')));

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

    const getTokens = async (address: string, fetchAvatar: boolean): Promise<CawUserName[]> => {

        if (!contract)
            throw new Error(CONTRACT_ERR_NOT_INIT);

        const tokens = await contract.tokens(address);

        const tokensArray: CawUserName[] = tokens.map((token: any) => {

            const _u: CawUserName = {
                id: parseInt(BigNumber.from(token.tokenId).toString()),
                balance: BigNumber.from(token.balance).toNumber(),
                userName: (token.username || ''),
                avatar: '',
            };

            return _u;
        });


        if (fetchAvatar) {
            const ids = tokensArray.map((t: CawUserName) => t.id);
            const promises = ids.map((id: number) => getTokenURI(id));
            const results = await Promise.all(promises);

            tokensArray.forEach((t: CawUserName, i: number) => {
                t.avatar = results[ i ].image;
            });
        }

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