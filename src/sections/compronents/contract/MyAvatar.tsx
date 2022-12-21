
import { SystemStyleObject } from "@chakra-ui/react";

import { useCawProvider } from "src/context/WalletConnectContext";
import Avatar from 'src/components/avatar/Avatar';

type Props = {
    sx?: SystemStyleObject;
}

export default function MyAvatar({ sx }: Props) {

    const { cawAccount } = useCawProvider();

    return (
        <Avatar
            name={cawAccount?.userName || ''}
            size="md"
            color="white"
            src={cawAccount?.avatar || ''}
            type={'ntf'}
            sx={sx}
        />
    )
}