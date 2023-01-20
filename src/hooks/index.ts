// * Generics
import useLocale from './useLocale'
import { useLocalStorage } from "./useLocalStorage";
import useAsync from './useAsync';
import useDebounce from './useDebounce';
import { useDebounceEffect } from './useDebounceEffect';
import useIsMounted from './useIsMounted';
import useOnClickOutside from './useOnClickOutside';

//* App Configurations
import useAppConfigurations from './useAppConfigurations'

//* Contracts / Blockchain
import useCawNameMinterContract from './contracts/useCawNameMinterContract';
import useCawNamesContract from './contracts/useCawNamesContract';
import useMintableCAWContract from './contracts/useMintableCAWContract';
import useETHBalance from './useETHBalance';
import useAccountBalance from './useAccountBalance';

export {
    useLocalStorage,
    useLocale,
    useAsync,
    useDebounce,
    useDebounceEffect,
    useIsMounted,
    useOnClickOutside,
    useAppConfigurations,
    useCawNameMinterContract,
    useCawNamesContract,
    useMintableCAWContract,
    useETHBalance,
    useAccountBalance
}