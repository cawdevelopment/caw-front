import { useCallback } from "react";
import { Box, Divider, useColorModeValue, useToken } from "@chakra-ui/react";

import PostContent from 'src/components/PostContent';
import { TagType } from "src/components/tag-parser/parser";
import { PostDto } from "src/types/community-feed";
import PostAvatar from './PostAvatar';
import PostActions from './PostActions';

type Props = {
    post: PostDto
};

export default function Post({ post }: Props) {

    const [ htLight, htDark ] = useToken('colors', [ 'caw.800', 'caw.600' ]);
    const [ mtLight, mtDark ] = useToken('colors', [ 'red.600', 'red.500' ]);
    const [ urlLight, urlDark ] = useToken('colors', [ 'blue.600', 'blue.500' ]);
    const htColor = useColorModeValue(htLight, htDark);
    const mtColor = useColorModeValue(mtLight, mtDark);
    const urlColor = useColorModeValue(urlLight, urlDark);

    const { id, content, likes, votes, commentsCount, transactionHash, date, author } = post;

    const handleHashTagClicked = useCallback((ht: string, type: TagType, element: any) => {
        console.log(ht, type, element);
    }, []);

    const handleDeletePost = useCallback(() => {
        console.log('Delete post', id);
    }, [ id ]);

    return (
        <div id={`post-${id}`} >
            <PostAvatar
                src={author?.media.src}
                displayName={author?.name}
                username={author?.userName}
                type={author?.media.type}
                verified={author?.verified}
                date={date}
                postId={id}
                txId={transactionHash}
                onDelete={handleDeletePost}
            />
            <Box sx={{ m: 4 }} >
                <PostContent
                    content={content}
                    htStyle={{ color: htColor }}
                    mtStyle={{ color: mtColor }}
                    urlStyle={{ color: urlColor }}
                    onHashtagClick={handleHashTagClicked}
                />
                <br />
                <PostActions
                    likes={likes}
                    votes={votes}
                    comments={commentsCount}
                    dislikes={0}
                    shared={0}
                />
            </Box>
            <Divider m={4} />
        </div>
    );
}   