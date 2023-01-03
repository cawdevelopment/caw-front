import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import { ConnectButton, } from "@rainbow-me/rainbowkit";

import { shortenAddress } from "src/utils/helper";
import { CawUserName } from "src/types/dtos";
import { useCawNames } from 'src/hooks/';

type ContextModel = {
    mounted: boolean;
    connected: boolean;
    address: string;
    shortenAddress: string;
    cawAccount: CawUserName | null;
    cawAccounts: CawUserName[];
    changeCawAccount: (cawAccount: CawUserName) => void;
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

const CAWContext = createContext(defaultValue);

//* Create a custom hook to use the context
const useCawProvider = () => {

    const context = useContext(CAWContext);
    if (context === undefined) {
        throw new Error('useCawContext must be used within a CAWProvider');
    }
    return context;
}


type Props = {
    children: ReactNode;
}

const CAWProvider = ({ children }: Props) => {

    const { address, status } = useAccount();
    const { initialized, read: { getTokens, getTokenURI } } = useCawNames();
    const [ userName, setUserName ] = useState<CawUserName | null>(null)
    const [ userNames, setUserNames ] = useState<CawUserName[]>([]);
    const [ getTokenFetched, setGetTokenFetched ] = useState(false);

    const handleCawAccount = useCallback(async (cawAccount: CawUserName) => {

        if (!cawAccount?.userName || !address)
            return;

        //* Validate if the user is the owner of the username
        const _userName = userNames.find((user) => user.userName === cawAccount.userName);
        if (!_userName)
            throw new Error('You are not the owner of this username');

        if (!_userName.avatar) {
            const uri = await getTokenURI(_userName.id);
            _userName.avatar = uri.image;
        }

        setUserName(_userName);
    }, [ address, userNames, getTokenURI ]);


    const handleFetchUserNames = useCallback(async () => {
        try {

            if (!address)
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
    }, [ address, getTokenFetched, getTokens ]);

    useEffect(() => {

        //* Reset the state when the address changes
        setGetTokenFetched(false);
        setUserName(null);
        setUserNames([]);
    }, [ address ]);

    useEffect(() => {

        //* Set the first username as the default when the userNames changes and current username is null
        if (!Boolean(userName) && userNames?.length > 0)
            handleCawAccount(userNames[ 0 ]);

    }, [ userName, userNames, handleCawAccount ]);

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
                <CAWContext.Provider value={{
                    address: address || '0x0000000000000000000000000000000000000000',
                    shortenAddress: shortenAddress(address || '0x000...0000'),
                    status,
                    cawAccount: userName,
                    cawAccounts: userNames,
                    account,
                    chain,
                    connected: (mounted || '').toString() !== "loading" && account?.address && chain?.id && !chain?.unsupported ? true : false,
                    mounted,
                    changeCawAccount: handleCawAccount,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                }}>
                    {children}
                </CAWContext.Provider>
            )}
        </ConnectButton.Custom>
    );
}

export { CAWContext, CAWProvider, useCawProvider };