import { ethers } from "ethers";
import type { Provider } from "@wagmi/core";

import { WalletBalanceModel } from "src/types/dtos";
import { AppEnvSettings } from 'src/config/siteSettings';
import { getContract } from "../hooks/contracts/helper";
import { deepCopy } from "ethers/lib/utils.js";

const DEFAULT_BALANCE: WalletBalanceModel[] = [
    {
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 0,
    },
    {
        symbol: 'CAW',
        name: 'A Hunters Dream',
        amount: 0,
    },
    {
        symbol: 'mCAW',
        name: 'Mintable CAW',
        amount: 0,
    }
];


export class WalletBalanceInterface {

    account: string;
    chainId: number;
    chainName: string;
    provider: ethers.providers.BaseProvider;
    cawContract: ethers.Contract;
    mCawContract: ethers.Contract;
    initialBalance: WalletBalanceModel[];


    constructor(account: string, chainId: number, chainName: string, providerArg: Provider | null) {

        this.account = account;
        this.chainId = chainId;
        this.chainName = (chainName || '').toLowerCase();
        this.initialBalance = WalletBalanceInterface.getInitialtBalance();

        const _s = AppEnvSettings();
        if (chainId === 1)
            this.provider = providerArg ? providerArg : new ethers.providers.JsonRpcProvider(_s.jsonRpcUrl);
        else
            this.provider = providerArg ? providerArg : ethers.getDefaultProvider({ chainId: this.chainId, name: this.chainName.toLowerCase() });

        this.cawContract = getContract({
            provider: providerArg,
            address: _s.contracts.CAW.address,
            abi: _s.contracts.CAW.abi,
            apiKey: _s.keys.INFURA_API_KEY,
            network: this.chainName,
        }).contract;

        this.mCawContract = getContract({
            provider: providerArg,
            address: _s.contracts.MINTABLE_CAW.address,
            abi: _s.contracts.MINTABLE_CAW.abi,
            apiKey: _s.keys.INFURA_API_KEY,
            network: this.chainName,
        }).contract;
    }

    static getInitialtBalance(): WalletBalanceModel[] {
        return DEFAULT_BALANCE.map((item) => deepCopy(item));
    }

    async getEthBalance() {
        try {
            const data = await this.provider.getBalance(this.account);
            const _bal = Number(ethers.utils.formatEther(data));
            return _bal;
        }
        catch (error) {
            return 0;
        }
    }

    async getCawBalance() {

        try {
            const data = await this.cawContract.balanceOf(this.account);
            const _bal = Number(ethers.utils.formatEther(data));
            return _bal;
        }
        catch (error) {
            return 0;
        }
    }

    async getMintableCawBalance() {

        try {
            const data = await this.mCawContract.balanceOf(this.account);
            const _bal = Number(ethers.utils.formatEther(data));
            return _bal;
        }
        catch (error) {
            return 0;
        }
    }

    async getBalances() {

        const eth_prom = this.getEthBalance();
        const caw_prom = this.getCawBalance();
        const mcaw_prom = this.getMintableCawBalance();
        const [ eth, caw, mcaw ] = await Promise.all([ eth_prom, caw_prom, mcaw_prom ]);

        return this.initialBalance.map((asset) => {

            if (asset.symbol === 'ETH') {
                return { ...asset, amount: eth }
            }

            if (asset.symbol === 'CAW') {
                return { ...asset, amount: caw }
            }

            if (asset.symbol === 'mCAW') {
                return { ...asset, amount: mcaw }
            }

            return asset;
        });
    }
}
