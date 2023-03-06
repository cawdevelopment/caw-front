import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import { ConnectButton, } from "@rainbow-me/rainbowkit";

import { shortenAddress } from "src/utils/helper";
import { CawUserName } from "src/types/dtos";
import { useCawNamesContract } from 'src/hooks/';

type ContextModel = {
    mounted: boolean;
    connected: boolean;
    address: string;
    shortenAddress: string;
    cawAccount: CawUserName | null;
    cawAccounts: CawUserName[];
    status: "connecting" | "disconnected" | "connected" | "reconnecting",
    account: {
        address: string;
        balanceDecimals?: number;
        balanceFormatted?: string;
        balanceSymbol?: string;
        displayBalance?: string;
        displayName: string;
        ensAvatar?: string;
        ensName?: string;
        hasPendingTransactions: boolean;
    } | undefined,
    chain: {
        hasIcon: boolean;
        iconUrl?: string;
        iconBackground?: string;
        id: number;
        name?: string;
        unsupported?: boolean;
    } | undefined,
    changeCawAccount: (cawAccount: CawUserName, throwErr: boolean) => void;
    openAccountModal: () => void;
    openChainModal: () => void;
    openConnectModal: () => void;
}


const defaultValue: ContextModel = {
    address: '',
    shortenAddress: '0x000...0000',
    status: 'disconnected',

    cawAccounts: [],
    cawAccount: null,
    mounted: false,
    connected: false,
    account: undefined,
    chain: undefined,
    changeCawAccount: () => { },
    openAccountModal: () => { },
    openChainModal: () => { },
    openConnectModal: () => { },
}

const DAppContext = createContext(defaultValue);

//* Create a custom hook to use the context
const useDappProvider = () => {

    const context = useContext(DAppContext);
    if (context === undefined) {
        throw new Error('useCawContext must be used within a CAWProvider');
    }
    return context;
}


type Props = {
    children: ReactNode;
}

const DAppProvider = ({ children }: Props) => {

    const { address, status, isConnected } = useAccount();
    const { initialized, read: { getTokens, getTokenURI } } = useCawNamesContract();
    const [ userName, setUserName ] = useState<CawUserName | null>(null)
    const [ userNames, setUserNames ] = useState<CawUserName[]>([]);
    const [ getTokenFetched, setGetTokenFetched ] = useState(false);


    const handleCawAccount = useCallback(async (cawAccount: CawUserName, throwErr: boolean) => {

        if (!cawAccount?.userName || !address)
            return;

        //* Validate if the user is the owner of the username
        const _userName = userNames.find((user) => user.userName === cawAccount.userName);
        if (!_userName) {

            if (throwErr)
                throw new Error('You are not the owner of this username');

            return;
        }

        if (!_userName.avatar) {
            const uri = await getTokenURI(_userName.id);
            _userName.avatar = uri.image;
        }

        setUserName(_userName);
    }, [ address, userNames, getTokenURI ]);


    const handleFetchUserNames = useCallback(async () => {
        try {

            if (!address || !isConnected)
                return;

            if (getTokenFetched)
                return;

            const _userNames = await getTokens(address, true);
            setUserNames(_userNames);
            setGetTokenFetched(true);
        }
        catch (error) {
            console.error("effect getting usernames :", error);
        }
    }, [ isConnected, address, getTokenFetched, getTokens ]);



    useEffect(() => {

        //* Set the first username as the default when the userNames changes and current username is null
        if (!Boolean(userName) && userNames?.length > 0)
            handleCawAccount(userNames[ 0 ], false);

    }, [ userName, userNames, handleCawAccount ]);

    useEffect(() => {

        if (status !== 'connected') {
            setUserName(null);
            setUserNames([]);
            setGetTokenFetched(false);
        }

    }, [ status ]);

    useEffect(() => {


        if (!initialized || !address || status !== 'connected')
            return;

        if (!getTokenFetched)
            handleFetchUserNames();

    }, [ address, initialized, status, getTokenFetched, handleFetchUserNames ]);


    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,                
                mounted,
            }) => (
                <DAppContext.Provider value={{
                    address: address || '0x0000000000000000000000000000000000000000',
                    shortenAddress: shortenAddress(address || '0x000...0000'),
                    status,
                    cawAccount: userName,
                    cawAccounts: userNames,
                    account,
                    chain,
                    connected: isConnected && (mounted || '').toString() !== "loading" && Boolean(account?.address) && Boolean(chain?.id) && !chain?.unsupported,
                    mounted,
                    changeCawAccount: handleCawAccount,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                }}>
                    {children}
                </DAppContext.Provider>
            )}
        </ConnectButton.Custom>
    );
}

export { DAppContext, DAppProvider, useDappProvider };