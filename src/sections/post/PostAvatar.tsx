import { Box, Stack, Tooltip, Text } from "@chakra-ui/react";
import NextLink from 'next/link';

import Avatar from 'src/components/avatar/Avatar';
import Iconify from 'src/components/icons/Iconify';
import { PATH_DASHBOARD } from "src/routes/paths";
import { MediaType } from "src/types/community-feed";
import { fDateTimeSuffix, fToNowShorter } from "src/utils/formatTime";
import { PostMenu } from "./PostMenu";

type Props = {
    src: string;
    verified: boolean;
    displayName: string;
    username: string;
    type: MediaType;
    date: Date,
    postId: string;
    txId: string;
    onDelete?: VoidFunction;
}

export default function PostAvatar(props: Props) {

    const { src, displayName, username, type, verified, date, postId, txId, onDelete } = props;
    const profileUrl = PATH_DASHBOARD.user.profile.replace(':username', username);

    return (
        <Stack direction="row" spacing={1} alignItems="center" id={`avatar-post-${postId}`}>
            <NextLink href={profileUrl} passHref >
                <div>
                    <Avatar
                        src={src}
                        name={displayName}
                        type={type}
                        sx={{ cursor: 'pointer' }}
                    />
                </div>
            </NextLink>
            <NextLink href={profileUrl} passHref>
                <Stack spacing={0}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Text
                            fontSize="sm"
                            fontWeight="bold"
                            cursor="pointer"
                        >
                            {displayName || ''}
                        </Text>
                        <span >.</span>
                        <Tooltip
                            hasArrow
                            label={fDateTimeSuffix(date)}
                        >
                            <span>
                                {fToNowShorter(date)}
                            </span>
                        </Tooltip>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            cursor="pointer"
                        >
                            {`@${username || ''}`}
                        </Text>
                        {verified && <Iconify icon={'ic:sharp-verified-user'} width={15} height={15} color="green" />}
                    </Stack>
                </Stack>
            </NextLink>
            <Box sx={{ flexGrow: 1 }} />
            <PostMenu txId={txId} postId={postId} onDelete={onDelete} />
        </Stack >
    )
}