import { useState } from "react";

import useIsMounted from "src/hooks/useIsMounted";

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
    const [ width, setWidth ] = useState(0);
    const { mounted } = useIsMounted();

    const onInitilizedBox = (width: number) => {

        if (mounted)
            setWidth(width);
    }

    switch (step) {
        case 1:
            return <WalletConnection onInitilizedBox={onInitilizedBox} />;
        case 2:
            return <WalletBalanceCard width={width} />;
        case 3:
            return <MintUserNameCard width={width} />;
        case 4:
            return <ConfirmAndMintCard width={width} userName={userName} />;
        default:
            return null;
    }
}
