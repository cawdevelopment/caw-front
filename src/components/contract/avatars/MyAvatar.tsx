
import { SystemStyleObject } from "@chakra-ui/react";

import { useDappProvider } from "src/context/DAppConnectContext";
import Avatar from 'src/components/avatar/Avatar';

type Props = {
    sx?: SystemStyleObject;
}

export default function MyAvatar({ sx }: Props) {

    const { cawAccount } = useDappProvider();

    return (
        <Avatar
            name={cawAccount?.userName || ''}
            size="md"
            color="white"
            src={cawAccount?.avatar || ''}
            type={'nft'}
            sx={sx}
        />
    )
}