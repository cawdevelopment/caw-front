"use client"

import { useState } from "react";
import dynamic from "next/dynamic"

import useIsMounted from "src/hooks/useIsMounted";
import { useMintingPageContext } from ".";

const WalletConnection = dynamic(() => import("./WalletConnection"), { ssr: false });
const WalletBalanceCard = dynamic(() => import("./WalletBalance"), { ssr: false });
const MintUserNameCard = dynamic(() => import("./MintUserNameCard"), { ssr: false });
const ConfirmAndMintCard = dynamic(() => import("./ConfirmAndMintCard"), { ssr: false });


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

    // switch (step) {
    //     case 1:
    //         return <WalletConnection onInitilizedBox={onInitilizedBox} />;
    //     case 2:
    //         return <WalletBalanceCard width={width} />;
    //     case 3:
    //         return <MintUserNameCard width={width} />;
    //     case 4:
    //         return <ConfirmAndMintCard width={width} userName={userName} />;
    //     default:
    //         return null;
    // }

    return (
        <>
            {step === 1 && <WalletConnection onInitilizedBox={onInitilizedBox} />}
            {step === 2 && <WalletBalanceCard width={width} />}
            {step === 3 && <MintUserNameCard width={width} />}
            {step === 4 && <ConfirmAndMintCard width={width} userName={userName} />}
        </>
    )
}
