import { createContext, ReactNode, useContext } from 'react';
import { ConnectButton, } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { shortenAddress } from "src/utils/helper";

type ContextModel = {
    mounted: boolean;
    connected: boolean;
    address: string;
    shortenAddress: string;
    cawNames: string[];
    cawName: string;
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
    cawNames: [],
    cawName: '',
    mounted: false,
    connected: false,
    account: undefined,
    chain: undefined,
    openAccountModal: () => { },
    openChainModal: () => { },
    openConnectModal: () => { },
}

const WalletContext = createContext(defaultValue);

//* Create a custom hook to use the context
const useWallet = () => {

    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}


type Props = {
    children: ReactNode;
}

const WalletProvider = ({ children }: Props) => {

    const { address, status } = useAccount();

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                return (
                    <WalletContext.Provider value={{
                        address: address || '0x0000000000000000000000000000000000000000',
                        shortenAddress: shortenAddress(address || '0x000...0000'),
                        status,
                        cawName: 'No Name',
                        cawNames: [],
                        account,
                        chain,
                        connected: (mounted || '').toString() !== "loading" && account?.address && chain?.id && !chain?.unsupported ? true : false,
                        mounted,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                    }}>
                        {children}
                    </WalletContext.Provider>
                );
            }}
        </ConnectButton.Custom>
    );
}

export { WalletContext, WalletProvider, useWallet };