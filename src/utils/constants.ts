import { Address } from "wagmi";

export const MILLION = 1000000;
export const BILLION = MILLION * 1000;
export const CONTRACT_ERR_NOT_INIT = 'Contract not initialized, please try again in a few seconds';
export const APP_NAME = 'CAW Social';
export const APP_DESCRIPTION = 'CAW is a fully decentralized - censorship-resistant on-chain messaging protocol built on top of the Ethereum network for the Future of Decentralized Social Media';
export const DEFAULT_OG = 'https://teh-eyes.vercel.app/logo.jpeg';

//* CAW CONTRACTS
export const MintableCAW_CONTRACT: Address = '0x0bc5f399265fA0Fb95F5473c8ec1737d1dBB015c';
export const CawName_CONTRACT: Address = '0x3F63Ad5E6309135a9D5fD3540270b93f56FD9CD9';
export const CawActions_CONTRACT = '0x6B22437861eCC2Ea93fEcB742EA3BD5E1d3C7307';
export const CawNameURI_CONTRACT: Address = '0x27108Da237A5200fBcb3fc62eE08Ee07D84a1331';
export const CawNameMinter_CONTRACT: Address = '0x56F0d5DA1Bc735e03d6A4cd988784ED498FD9Ee3';
export const AHuntersDream_CONTRACT: Address = '0xf3b9569F82B18aEf890De263B84189bd33EBe452';

export const DEFAULT_JSON_RPC_URL = 'https://rpc.builder0x69.io';