import { Avatar, SystemStyleObject } from '@chakra-ui/react'
import { MediaType } from 'src/types/community-feed'

export type Props = {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | '2xs'
    src?: string
    name?: string
    color?: string
    sx?: SystemStyleObject,
    type?: MediaType
}

export default function UserAvatar(props: Props) {

    const { size = "md", src, name = "", color, sx } = props;
    return (
        <Avatar name={name} src={src} size={size} loading="lazy" color={color} sx={sx} />
    );
}