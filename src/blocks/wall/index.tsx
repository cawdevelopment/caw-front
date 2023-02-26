import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@chakra-ui/react";

import { posts } from 'src/utils/mock/wallposts'
import NewPost from 'src/blocks/post/NewPost';
import Post from 'src/blocks/post';
import { PostDto } from 'src/types/community-feed';

export default function WallPost() {

    //* Pagination rendering logic
    const { t } = useTranslation();
    const [ data, setData ] = useState<PostDto[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

        //* Load posts from API
        setTimeout(() => {
            setData(posts);
            setLoading(false);
        }, 50);

    }, []);

    return (
        <Box m={{ base: 3, md: 6 }} >
            {loading && <div>{t('labels.loading')}</div>}
            {!loading && (
                <NewPost />
            )}
            {data.map((post) => (
                <div key={post.id}>
                    <Post post={post} />
                </div>
            ))}
        </Box>
    );
}