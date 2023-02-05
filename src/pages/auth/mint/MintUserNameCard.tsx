import { useCallback, useEffect, useRef } from "react";
import { Stack, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";

import { useDebounceEffect, useCawNameMinterContract } from "src/hooks";
import { isValidUsername as validateUserNameLocally } from "src/utils/manifestoHelper";
import { WrapperFadeAnimation } from "src/components/animate";
import AlertMessage from "src/components/AlertMessage";

import { useMintingPageContext } from ".";
import MintingCost from "./MintingCost";

export default function MintUserNameCard({ width }: { width: number }) {

    const { t } = useTranslation();
    const { userName, isValid, message, setValue, setManyValues } = useMintingPageContext();
    const { initialized, getCostOfName, isValidUsername, getIdByUserName } = useCawNameMinterContract();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        if (inputRef?.current) {
            inputRef.current.focus();
            inputRef.current.value = userName;
        }

    }, [ userName ]);

    const checkUsername = useCallback((async (userName: string) => {
        try {

            if (!(validateUserNameLocally(userName))) {
                setManyValues([
                    { key: 'isValid', value: false },
                    { key: 'message', value: userName ? t('minting_page.username_invalid') : '' },
                    { key: 'onChainValidated', value: false }
                ]);
                return;
            }

            if (!initialized)
                return;

            const [isValid, id] = await Promise.all([isValidUsername(userName), getIdByUserName(userName)]);

            if (id > 0) {
                setManyValues([
                    { key: 'isValid', value: false },
                    { key: 'message', value: `${userName} : ${t('minting_page.username_already_taken')}` },
                    { key: 'onChainValidated', value: true }
                ]);
                return;
            }

            if (!isValid) {
                setManyValues([
                    { key: 'isValid', value: false },
                    { key: 'message', value: t('minting_page.username_invalid') },
                    { key: 'onChainValidated', value: true }
                ]);
                return;
            }

            setManyValues([
                { key: 'isValid', value: true },
                { key: 'message', value: `${userName} : ${t('minting_page.username_available')}` },
                { key: 'onChainValidated', value: true }
            ]);
        }
        catch (error: any) {
            console.log("check username: ", error);
            setManyValues([
                { key: 'isValid', value: false },
                { key: 'message', value: error?.message || 'An error occured' },
                { key: 'onChainValidated', value: true }
            ]);
        }
    }), [ t, initialized, isValidUsername, getIdByUserName, setManyValues ]);

    const getCost = useCallback((async (userName: string) => {

        try {

            if (!validateUserNameLocally(userName)) {
                setManyValues([
                    { key: 'costVerified', value: false },
                    { key: 'costUSD', value: 0 },
                    { key: 'costETH', value: 0 },
                    { key: 'costCAW', value: 0 }
                ]);
                return;
            }

            if (!initialized)
                return;

            const cost = await getCostOfName(userName);
            setManyValues([
                { key: 'costUSD', value: cost.constInUsd },
                { key: 'costETH', value: cost.costInEth },
                { key: 'costCAW', value: cost.cost },
                { key: 'costVerified', value: true }
            ]);
        }
        catch (error: any) {
            console.log("get cost: ", error);
            setManyValues([
                { key: 'message', value: error?.message || 'An error occured' },
                { key: 'costVerified', value: false },
                { key: 'costUSD', value: 0 },
                { key: 'costETH', value: 0 },
                { key: 'costCAW', value: 0 }
            ]);
        }
    }), [ initialized, getCostOfName, setManyValues ]);

    const handleCheckUsername = useCallback(() => {

        checkUsername(userName);
        getCost(userName);

    }, [ userName, checkUsername, getCost ]);

    useDebounceEffect(handleCheckUsername, 40, [ userName ]);

    const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue('userName', (e.target.value || '').toLowerCase());
    }

    return (
        <Stack spacing={4} width={width <= 0 ? 'full' : width}>
            <FormControl id="username">
                <FormLabel>{t('minting_page.enter_nft_input_lb') + ':'}</FormLabel>
                <InputGroup>
                    <Input        
                        ref={inputRef}
                        size='lg'
                        variant='filled'
                        type="text"
                        onChange={handleSetUsername}
                        style={{ textTransform: 'lowercase' }}
                    />
                    <InputRightElement alignItems={"center"} children={userName ? (isValid ? <CheckIcon color='green.500' /> : <CloseIcon color='red.500' />) : null} />
                </InputGroup>
            </FormControl>
            <WrapperFadeAnimation show={Boolean(message)} exitDuration={0.5}>
                <AlertMessage
                    type={isValid ? 'success' : 'warning'}
                    variant="subtle"
                    showIcon={isValid}
                    message={message}
                />
            </WrapperFadeAnimation>
            <MintingCost title={t('labels.cost') + ':'} />
        </Stack>
    );
}

