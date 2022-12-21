import { useMintingPageContext } from ".";
import WalletConnection from "./WalletConnection";
import ConfirmAndMintCard from "./ConfirmAndMintCard";
import MintUserNameCard from "./MintUserNameCard";
import WalletBalanceCard from './WalletBalance';

type Props = {
    step: number;
    userName: string;
}

export default function Steps({ step }: Props) {

    const { userName } = useMintingPageContext();

    switch (step) {
        case 1:
            return <WalletConnection />;
        case 2:
            return <WalletBalanceCard />;
        case 3:
            return <MintUserNameCard />;
        case 4:
            return <ConfirmAndMintCard userName={userName} />;
        default:
            return null;
    }
}
