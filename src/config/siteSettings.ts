import {
    MintableCAW_CONTRACT, CawName_CONTRACT, CawActions_CONTRACT,
    CawNameURI_CONTRACT, CawNameMinter_CONTRACT, AHuntersDream_CONTRACT, DEFAULT_JSON_RPC_URL
} from 'src/utils/constants'
import { CAW_ABI, CAW_NAMES_ABI, MINTABLE_CAW_ABI, CAW_NAME_MINTER_ABI } from 'src/config';


export function AppEnvSettings() {

    const NETWORK = String(process.env.NETWORK || '').toLowerCase();
    const INFURA_API_KEY = String(process.env.INFURA_API_KEY);
    const ALCHEMY_API_KEY = String(process.env.ALCHEMY_API_KEY);

    const ENVIRONMENT = String(process.env.ENVIRONMENT || '').toLowerCase();
    const JSON_RPC_URL = String(process.env.JSON_RPC_URL || DEFAULT_JSON_RPC_URL);

    return {
        keys: {
            INFURA_API_KEY,
            ALCHEMY_API_KEY,
        },
        network: NETWORK,
        environment: ENVIRONMENT,
        jsonRpcUrl: JSON_RPC_URL,
        contracts: {
            CAW: {
                address: AHuntersDream_CONTRACT,
                abi: CAW_ABI,
            },
            CAW_NAME: {
                address: CawName_CONTRACT,
                abi: CAW_NAMES_ABI,
            },
            CAW_ACTIONS: {
                address: CawActions_CONTRACT,
            },
            CAW_NAME_URI: {
                address: CawNameURI_CONTRACT,
            },
            CAW_NAME_MINTER: {
                address: CawNameMinter_CONTRACT,
                abi: CAW_NAME_MINTER_ABI,
            },
            MINTABLE_CAW: {
                address: MintableCAW_CONTRACT,
                abi: MINTABLE_CAW_ABI,
            }
        }
    }
}
