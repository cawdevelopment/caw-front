
import { useNetwork ,useProvider} from "wagmi";
import { AppEnvSettings } from "src/config/siteSettings";

export default function useAppConfigurations() {

    const { chain } = useNetwork();
    const provider = useProvider();
 
    const _v = AppEnvSettings()
    const _env = _v.environment;
    return {
        ..._v,
        provider : provider,
        allowMainnet: ((chain?.id || 0) === 1) ? (_env === 'production' || _env === 'live') && (_v.network === 'mainnet') : true,
    };
}