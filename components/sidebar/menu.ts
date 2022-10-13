
import { PATH_DASHBOARD } from 'routes/paths';

export interface LinkItemProps {
    name: string;
    icon: string;
    link: string;
}

//* Get icons from https://icon-sets.iconify.design/
export const LinkItems: Array<LinkItemProps> = [
    {
        name: 'Home',
        icon: 'ci:home-heart-1',
        link: PATH_DASHBOARD.app.home
    },
    {
        name: 'Explore',
        icon: 'clarity:hashtag-solid',
        link: PATH_DASHBOARD.app.explore
    },
    {
        name: 'Notifications',
        icon: 'clarity:bell-solid',
        link: PATH_DASHBOARD.app.notifications
    },
    {
        name: 'Messages',
        icon: 'bi:chat-square-heart-fill',
        link: PATH_DASHBOARD.app.messages
    },
    {
        name: 'Bookmarks',
        icon: 'bxs:bookmark-heart',
        link: PATH_DASHBOARD.app.bookmarks
    },
    {
        name: 'List',
        icon: 'fa:th-list',
        link: PATH_DASHBOARD.app.lists
    },
    {
        name: 'Profile',
        icon: 'carbon:user-filled',
        link: PATH_DASHBOARD.app.userProfile
    },
    {
        name: 'Settings',
        icon: 'fluent:more-circle-32-filled',
        link: PATH_DASHBOARD.app.settings
    },
];