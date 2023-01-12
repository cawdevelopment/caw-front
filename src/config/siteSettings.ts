import { CAW_ABI, CAW_NAMES_ABI, MINTABLE_CAW_ABI, CAW_NAME_MINTER_ABI } from 'src/config';

export function AppEnvSettings() {

    const NETWORK = String(process.env.NETWORK || '').toLowerCase();
    const INFURA_API_KEY = String(process.env.INFURA_API_KEY);
    const ALCHEMY_API_KEY = String(process.env.ALCHEMY_API_KEY);
    const CAW_CONTRACT = String(process.env.CAW_CONTRACT);
    const CAW_NAME_CONTRACT = String(process.env.CAW_NAME_CONTRACT);
    const CAW_NAME_MINTER_CONTRACT = String(process.env.CAW_NAME_MINTER_CONTRACT);
    const MINTABLE_CAW_CONTRACT = String(process.env.MINTABLE_CAW_CONTRACT);
    const ENVIRONMENT = String(process.env.ENVIRONMENT || '').toLowerCase();

    return {
        keys: {
            INFURA_API_KEY,
            ALCHEMY_API_KEY,
        },
        network: NETWORK,
        environment: ENVIRONMENT,
        contracts: {
            CAW: {
                address: CAW_CONTRACT,
                abi: CAW_ABI,
            },
            CAW_NAME: {
                address: CAW_NAME_CONTRACT,
                abi: CAW_NAMES_ABI,
            },
            CAW_NAME_MINTER: {
                address: CAW_NAME_MINTER_CONTRACT,
                abi: CAW_NAME_MINTER_ABI,
            },
            MINTABLE_CAW: {
                address: MINTABLE_CAW_CONTRACT,
                abi: MINTABLE_CAW_ABI,
            }
        }
    }
}
