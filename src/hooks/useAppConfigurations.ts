
import { CAW_NAMES_ABI, MINTABLE_CAW_ABI, CAW_NAME_MINTER_ABI } from 'src/config/ABIs';

export default function useAppConfigurations() {

    const NETWORK = String(process.env.NETWORK);
    const INFURA_API_KEY = String(process.env.INFURA_API_KEY);
    const ALCHEMY_API_KEY = String(process.env.ALCHEMY_API_KEY);
    const CAW_CONTRACT = String(process.env.CAW_CONTRACT);
    const CAW_NAME_CONTRACT = String(process.env.CAW_NAME_CONTRACT);
    const CAW_NAME_MINTER_CONTRACT = String(process.env.CAW_NAME_MINTER_CONTRACT);
    const MINTABLE_CAW_CONTRACT = String(process.env.MINTABLE_CAW_CONTRACT);

    return {
        keys: {
            INFURA_API_KEY,
            ALCHEMY_API_KEY,
        },
        network: NETWORK,
        contracts: {
            CAW: {
                address: CAW_CONTRACT,
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