import packageJson from '../../package.json';

export function slugify(text: string) {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[\s\W-]+/g, '-'); // Replace spaces, non-word characters and dashes with a single dash (-)    
}

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export const shortenAddress = (address: string) => address ? `${address.slice(0, 4)}...${address.slice(address.length - 4)}` : '';


export const sentenceCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getAppVersion = () => {
    const { name, version } = packageJson
    return name + '/' + version
}

export const isMobileDevice = () => {
    const math = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return math;
}

export const isMetaMaskBrowser = () => {

    const ethereum = window.ethereum;
    if (ethereum && ethereum.isMetaMask)
        return true;

    const math = /MetaMask/i.test(navigator.userAgent);
    return math;
}

export const isInWalletBrowser = () => {

    //* test MetaMask|Trust Wallet|WalletConnect|Coinbase Wallet|Enjin|Status Wallet
    const math = /MetaMask|Trust Wallet|WalletConnect|Enjin|Status Wallet/i.test(navigator.userAgent);

    //* if user-agent end of with "Mobile/15E148" then it is likely a in-wallet browser
    if (!math) {

        const strNavigatorUserAgent = navigator.userAgent;
        const strEndOfUserAgent = strNavigatorUserAgent.substring(strNavigatorUserAgent.length - 13, strNavigatorUserAgent.length);
        if (strEndOfUserAgent.toLowerCase() === 'Mobile/15E148'.toLowerCase())
            return true;
    }

    if (!math)
        return isMetaMaskBrowser();

    return math;
}