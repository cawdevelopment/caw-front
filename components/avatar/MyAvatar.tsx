
import { SystemStyleObject } from "@chakra-ui/react";

import Avatar from './Avatar';
import { user } from 'types/community-feed';

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