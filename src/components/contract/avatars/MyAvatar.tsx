
import { SystemStyleObject } from "@chakra-ui/react";
import Blockies from 'react-blockies';

import StoryStyledAvatar from "src/components/avatar/StoryStyledAvatar";
import { useDappProvider } from "src/context/DAppConnectContext";

type Props = {
    sx?: SystemStyleObject;
}

export default function MyAvatar({ sx }: Props) {

    const { connected, cawAccount, address } = useDappProvider();

    if (!connected) {
        return (
            <Blockies
                seed={(address || '0x0').toLowerCase()}
                scale={5} size={8}
                className="rounded-full"
            />);
    }

    return (
        <StoryStyledAvatar
            src={cawAccount?.avatar || ''}
            alt={cawAccount?.userName || ''}
        />
    );
}