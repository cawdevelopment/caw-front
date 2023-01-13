import { useCallback, useEffect, useMemo, useRef } from "react";
import { Stack, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";
import debounce from 'lodash.debounce';

import { useMintingPageContext } from ".";
import useCawNameMinterContract from "src/hooks/contracts/useCawNameMinterContract";
import { isValidUsername as validateUserNameLocally } from "src/utils/manifestoHelper";
import MintingCost from "./MintingCost";
import { WrapperFadeAnimation } from "src/components/animate";
import AlertMessage from "src/components/AlertMessage";

export default function MintUserNameCard({ width }: { width: number }) {

    const { t } = useTranslation();
    const { userName, isValid, message, onSetValue } = useMintingPageContext();
    const { getCostOfName, isValidUsername, getIdByUserName } = useCawNameMinterContract();
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
                onSetValue('isValid', false);
                onSetValue('message', userName ? t('minting_page.username_invalid') : '');
                onSetValue('onChainValidated', false);
                return;
            }

            const [isValid, id] = await Promise.all([isValidUsername(userName), getIdByUserName(userName)]);

            if (id > 0) {
                onSetValue('isValid', false);
                onSetValue('message', `${userName} : ${t('minting_page.username_already_taken')}`);
                onSetValue('onChainValidated', true);
                return;
            }

            if (!isValid) {
                onSetValue('isValid', false);
                onSetValue('message', t('minting_page.username_invalid'));
                onSetValue('onChainValidated', true);
                return;
            }

            onSetValue('isValid', true);
            onSetValue('message', `${userName} : ${t('minting_page.username_available')}`);
            onSetValue('onChainValidated', true);
        }
        catch (error: any) {
            console.log("check username: ", error);
            onSetValue('isValid', false);
            onSetValue('message', error?.message || 'An error occured');
            onSetValue('onChainValidated', true);
        }
    }), [ t, isValidUsername, getIdByUserName, onSetValue ]);

    const getCost = useCallback((async (userName: string) => {
        try {

            if (!validateUserNameLocally(userName)) {
                onSetValue('costVerified', false);
                onSetValue('costUSD', 0);
                onSetValue('costETH', 0);
                onSetValue('costCAW', 0);
                return;
            }

            const cost = await getCostOfName(userName);

            onSetValue('costUSD', cost.constInUsd);
            onSetValue('costETH', cost.costInEth);
            onSetValue('costCAW', cost.cost);
            onSetValue('costVerified', true);

        } catch (error: any) {
            console.log("get cost: ", error);
            onSetValue('message', error?.message || 'An error occured');
            onSetValue('costVerified', false);
            onSetValue('costUSD', 0);
            onSetValue('costETH', 0);
            onSetValue('costCAW', 0);
        }
    }), [ getCostOfName, onSetValue ]);


    const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        checkUsername(event.target.value);
        getCost(event.target.value);
        onSetValue('userName', event.target.value);
    }, [ onSetValue, checkUsername, getCost ]);

    const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [ changeHandler ]);

    useEffect(() => () => { debouncedChangeHandler.cancel(); }, [ debouncedChangeHandler ]);

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
                        onChange={debouncedChangeHandler} 
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

