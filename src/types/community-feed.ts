import { uuidv4 } from "src/utils/helper";

export type MediaType = 'image' | 'video' | 'audio' | 'file' | 'text' | 'url' | 'nft';

export type MediaMetaDto = {
    id: string;
    src: string;
    type: MediaType;
    width: number;
    height: number;
    watermark: {
        porcentage: number;
    };
}

export type FollowerDto = {
    id: string;
    avatar: MediaMetaDto;
    name: string;
    country: string;
    isFollowed: boolean;
};


export type AuthorDto = {
    id: string;
    name: string;
    userName: string;
    media: MediaMetaDto;
    wallet: string;
    verified: boolean;
    followers: number;
    following: number;
}

export type PostDto = {
    id: string;
    transactionHash: string;
    title: string;
    content: string;
    date: Date;
    author: AuthorDto;
    votes: number;
    likes: number;
    commentsCount: number;
    media: MediaMetaDto[];
}

export type AuthUser = {
    id: string;
    username: string;
    wallet: string;
    avatar: MediaMetaDto;
}

export const name_eateregg = 'cawfee';
export const avatar_eateregg_ = 'https://pbs.twimg.com/profile_images/1576311533382078466/jfOC1m_E_400x400.jpg';

export const user: AuthUser = {
    id: uuidv4(),
    username: name_eateregg,
    wallet: '0x0000000000000000000000000000000000000000',
    avatar: {
        src: avatar_eateregg_,
        width: 100,
        height: 100,
        id: uuidv4(),
        type: 'nft',
        watermark: {
            porcentage: 0.5,
        }
    }
}
