import { ethers } from "ethers";
import { WalletBalanceModel } from "src/types/dtos";
import { AppEnvSettings } from 'src/config/siteSettings';
import { getContract } from "../hooks/contracts/helper";

export const defaultBalance: WalletBalanceModel[] = [
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

    constructor(account: string, chainId: number, chainName: string) {

        this.account = account;
        this.chainId = chainId;
        this.chainName = (chainName || '').toLowerCase();

        const _s = AppEnvSettings();
        if (chainId === 1)
            this.provider = new ethers.providers.JsonRpcProvider(_s.jsonRpcUrl);
        else
            this.provider = ethers.getDefaultProvider({ chainId: this.chainId, name: this.chainName.toLowerCase() });

        this.cawContract = getContract({
            address: _s.contracts.CAW.address,
            abi: _s.contracts.CAW.abi,
            apiKey: _s.keys.INFURA_API_KEY,
            network: this.chainName,
        }).contract;

        this.mCawContract = getContract({
            address: _s.contracts.MINTABLE_CAW.address,
            abi: _s.contracts.MINTABLE_CAW.abi,
            apiKey: _s.keys.INFURA_API_KEY,
            network: this.chainName,
        }).contract;
    }

    static DEFAULT_BALANCE = defaultBalance;

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

        return defaultBalance.map((asset) => {

            if (asset.symbol === 'ETH') {
                asset.amount = eth;
            }

            if (asset.symbol === 'CAW') {
                asset.amount = caw;
            }

            if (asset.symbol === 'mCAW') {
                asset.amount = mcaw;
            }

        });
    }
}
