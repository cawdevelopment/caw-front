import { useCallback, useState } from "react";
import { Stack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useColorModeValue } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";

import { useMintingPageContext } from ".";
import useCawNameMinterContract from "src/hooks/useCawNameMinterContract";
import { isValidUsername as validateUserNameLocally } from "src/utils/helper";
import MintingCost from "./MintingCost";

export default function MintUserNameCard() {

    const { t } = useTranslation();
    const { userName, isValid, message, onSetValue } = useMintingPageContext();
    const { getCostOfName, isValidUsername, getIdByUserName } = useCawNameMinterContract();
    const errorColor = useColorModeValue('red.500', 'red.600');
    const successColor = useColorModeValue('green.500', 'green.600');

    const [value, setValue] = useState<string>(userName);
    // const [debouncedValue] = useDebounce(value, 500);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(Number(e.target.value));

    // useEffect(() => {
    //     setValue(userName);
    // }, [ userName ]);

    // useEffect(() => {
    //     onSetValue('userName', debouncedValue);
    // }, [debouncedValue, onSetValue])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        checkUsername(event.target.value);
        getCost(event.target.value);
    }

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
                onSetValue('message', `${userName} ${t('minting_page.username_already_taken')}`);
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
            onSetValue('message', `${userName} ${t('minting_page.username_available')}`);
            onSetValue('onChainValidated', true);
        }
        catch (error) {
            onSetValue('isValid', false);
            onSetValue('message', 'An error occured');
            onSetValue('onChainValidated', true);
        }
    }), [t, isValidUsername, getIdByUserName, onSetValue]);

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

        } catch (error) {
            onSetValue('message', 'An error occured while getting the cost');
            onSetValue('costVerified', false);
            onSetValue('costUSD', 0);
            onSetValue('costETH', 0);
            onSetValue('costCAW', 0);
        }
    }), [getCostOfName, onSetValue]);

    return (
        <Stack spacing={4}>
            <FormControl id="username">
                <FormLabel>{t('minting_page.enter_ntf_input_lb') + ':'}</FormLabel>
                <InputGroup>
                    <Input
                        value={value}
                        size='lg'
                        variant='filled'
                        type="text"
                        onChange={handleChange}
                    />
                    <InputRightElement alignItems={"center"} children={userName ? (isValid ? <CheckIcon color='green.500' /> : <CloseIcon color='red.500' />) : null} />
                </InputGroup>
            </FormControl>
            <Text color={isValid ? successColor : errorColor} as="b">{message}</Text>
            <MintingCost title={t('labels.cost') + ':'} />
        </Stack>
    );
}

