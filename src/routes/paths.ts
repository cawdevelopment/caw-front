
function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/app';
const ROOTS_USER = '/user';


export const PATH_AUTH = {
    root: ROOTS_AUTH,
    connect: path(ROOTS_AUTH, '/connect'),
    mint: path(ROOTS_AUTH, '/mint'),
    minted: path(ROOTS_AUTH, '/minted/[username]/[tx]')
};

export const PATH_PAGE = {
    maintenance: '/maintenance',
    discover: '/discover',
    page404: '/404',
    page500: '/500',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    app: {
        home: path(ROOTS_DASHBOARD, '/home'),
        explore: path(ROOTS_DASHBOARD, '/explore'),
        messages: path(ROOTS_DASHBOARD, '/messages'),
        bookmarks: path(ROOTS_DASHBOARD, '/bookmarks'),
        notifications: path(ROOTS_DASHBOARD, '/notifications'),
        lists: path(ROOTS_DASHBOARD, '/lists'),
        accounts: path(ROOTS_DASHBOARD, '/accounts'),
        settings: path(ROOTS_DASHBOARD, '/settings'),
        chakra_test: path(ROOTS_DASHBOARD, '/chakra_test'),
    },
    user: {
        profile: path(ROOTS_USER, '/profile/:username'),
    },
    swap: {
        mcaw: path(ROOTS_DASHBOARD, '/swap/mcaw'),
    }
};
