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

export const isValidUsername = (username: string) => {

    //* a-z and 0-9, without the use of special characters or spaces, no more than 255 characters, no capital letters    
    if (!username)
        return false;

    if (username.length === 0 || username.length > 255)
        return false;

    const regex = /^[a-z0-9]+$/;
    return regex.test(username);
}

export const sentenceCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
