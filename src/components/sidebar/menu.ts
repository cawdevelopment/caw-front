import { PATH_DASHBOARD } from 'src/routes/paths';

export interface LinkItemProps {
    name: string;
    icon: string;
    link: string;
}

//* Get icons from https://icon-sets.iconify.design/
export const LinkItems: Array<LinkItemProps> = [
    {
        name: 'sidebar_menu.home',
        icon: 'ci:home-heart-1',
        link: PATH_DASHBOARD.app.home
    },
    {
        name: 'sidebar_menu.explore',
        icon: 'clarity:hashtag-solid',
        link: PATH_DASHBOARD.app.explore
    },
    {
        name: 'sidebar_menu.notifications',
        icon: 'clarity:bell-solid',
        link: PATH_DASHBOARD.app.notifications
    },
    {
        name: 'sidebar_menu.messages',
        icon: 'bi:chat-square-heart-fill',
        link: PATH_DASHBOARD.app.messages
    },
    {
        name: 'sidebar_menu.bookmarks',
        icon: 'bxs:bookmark-heart',
        link: PATH_DASHBOARD.app.bookmarks
    },
    {
        name: 'sidebar_menu.lists',
        icon: 'fa:th-list',
        link: PATH_DASHBOARD.app.lists
    },
    {
        name: 'sidebar_menu.profile',
        icon: 'carbon:user-filled',
        link: PATH_DASHBOARD.app.accounts
    },
    {
        name: 'sidebar_menu.more',
        icon: 'fluent:more-circle-32-filled',
        link: PATH_DASHBOARD.app.settings
    },
];