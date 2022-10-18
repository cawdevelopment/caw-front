import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@chakra-ui/react";

import { posts } from 'utils/mock/wallposts'
import NewPost from 'sections/post/NewPost';
import Post from 'sections/post';
import { PostDto } from 'types/community-feed';

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
        }, 100);

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