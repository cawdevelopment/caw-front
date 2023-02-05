import { getCawPriceInUsd } from "src/hooks/contracts/helper";

export const NFT_COST: any = {
    1: 1000000000000,
    2: 240000000000,
    3: 60000000000,
    4: 6000000000,
    5: 200000000,
    6: 20000000,
    7: 10000000,
    8: 1000000
}

type CAW_ACTION = 'FOLLOW_ACC' | 'SEND_CAW' | 'LIKECAW' | 'RECAW';
export const ACTION_COST: any = {
    FOLLOW_ACC: 30000,
    SEND_CAW: 5000,
    LIKECAW: 2000,
    RECAW: 4000,
}

// export const TOTAL_CAW_SUPPLY = 666666666666666;
export const TOTAL_CAW_SUPPLY = 555555555555555;

export function NtfCostInCaw(username: string) {

    if (username.length > 8)
        return Number(NFT_COST[ 8 ])
    else
        return Number(NFT_COST[ username.length ] || 0);
}

export const isValidUsername = (username: string) => {

    //* a-z and 0-9, without the use of special characters or spaces, no more than 255 characters, no capital letters    
    if (!username)
        return false;

    if (username.length === 0 || username.length > 255)
        return false;

    const regex = /^[a-z0-9]+$/;
    return regex.test(username);
}

export const NftCostInUsd = (username: string, cawUsdPrice: number) => {
    const costInCaw = NtfCostInCaw(username);
    return costInCaw * (cawUsdPrice < 0 ? 0 : cawUsdPrice);
}

export const NftCostInUsdByLength = (nftLength: number, cawUsdPrice: number) => {

    const costInCaw = NFT_COST[ nftLength ];
    return costInCaw * (cawUsdPrice < 0 ? 0 : cawUsdPrice);
}

export const calculateMCap = (cawUsdPrice: number) => (TOTAL_CAW_SUPPLY * cawUsdPrice);

export const getCurrentMCap = async () => {
    const cawUsdPrice = await getCawPriceInUsd();
    return calculateMCap(cawUsdPrice);
}

export const NftCostAtMcap = (username: string | number, marketCap: number[]) => {

    //* Calculate the cost of the NFT at different market caps
    const costInCaw = typeof username === 'string' ? NtfCostInCaw(username) : (NFT_COST[ username ] || NFT_COST[ 8 ]);
    const costAtMcap: any = {};

    for (let i = 0; i < marketCap.length; i++) {

        const mcap = marketCap[ i ];
        const priceAtMcap = mcap / TOTAL_CAW_SUPPLY;
        const cost = costInCaw * priceAtMcap;

        costAtMcap[ mcap ] = cost;
    };

    return costAtMcap;
}

export const actionCostAtMcap = (action: CAW_ACTION, marketCap: number[]) => {

    const costInCaw = ACTION_COST[ action ];
    const costAtMcap: any = {};


    for (let i = 0; i < marketCap.length; i++) {

        const mcap = marketCap[ i ];
        const priceAtMcap = mcap / TOTAL_CAW_SUPPLY;
        const cost = costInCaw * priceAtMcap;

        costAtMcap[ mcap ] = cost;
    };

    return costAtMcap;
}