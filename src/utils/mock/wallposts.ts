import { PostDto } from 'src/types/community-feed';
import _mock from './mock';
import { randomNumberRange } from "./funcs";


export const posts: PostDto[] = Array.from({ length: 41 }, (_, i) => ({
    id: _mock.id(i),
    transactionHash: _mock.id(i),
    title: _mock.text.title(i),
    content: _mock.text.description(i),
    author: {
        id: _mock.id(i),
        name: _mock.name.fullName(i),
        userName: _mock.name.userName(i),
        media: {
            id: _mock.id(i),
            src: _mock.image.avatar(i),
            height: 100,
            type: 'nft',
            width: 100,
            watermark: {
                porcentage: 0,
            }
        },
        wallet: _mock.id(i),
        verified: _mock.boolean(i),
        followers: randomNumberRange(999, 99999),
        following: randomNumberRange(999, 99999),
    },
    votes: randomNumberRange(999, 99999),
    commentsCount: randomNumberRange(999, 99999),
    likes: randomNumberRange(999, 99999),
    date: _mock.time(i),
    media: Array.from({ length: 10 }, (_, i) => ({
        id: _mock.id(i),
        src: _mock.image.avatar(i),
        height: 100,
        type: 'image',
        width: 100,
        watermark: {
            porcentage: 0,
        }
    })),
}));
