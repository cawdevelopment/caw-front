
import { SystemStyleObject } from "@chakra-ui/react";

import { user } from 'src/types/community-feed';
import Avatar from './Avatar';

type Props = {
    sx?: SystemStyleObject;
}

export default function MyAvatar({ sx }: Props) {

    return (
        <Avatar
            name="cawfee"
            size="md"
            color="white"
            src={user?.avatar?.src}
            type={user?.avatar?.type}
            sx={sx}
        />
    )
}