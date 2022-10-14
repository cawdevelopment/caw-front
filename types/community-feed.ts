export type MediaType = 'image' | 'video' | 'audio' | 'file' | 'text' | 'url' | 'ntf';

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