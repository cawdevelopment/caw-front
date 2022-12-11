import { useCallback } from "react";
import { Stack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useColorModeValue } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

import useCawNameMinterContract from "src/hooks/useCawNameMinterContract";
import { isValidUsername as validateUserNameLocally } from "src/utils/helper";
import { MintingCost } from "./MintingCost";


export function MintUserNameCard() {

    const { t } = useTranslation();
    const { register, setValue, watch } = useFormContext();
    const { userName, isValid, message } = watch();
    const { getCostOfName, isValidUsername, getIdByUserName } = useCawNameMinterContract();
    const errorColor = useColorModeValue('red.500', 'red.600');
    const successColor = useColorModeValue('green.500', 'green.600');

    const handleChange = (event: any) => {
        checkUsername(event.target.value);
        getCost(event.target.value);
    }

    const checkUsername = useCallback((async (userName: string) => {
        try {

            if (!(validateUserNameLocally(userName))) {

                setValue('isValid', false);
                setValue('message', userName ? t('minting_page.username_invalid') : '');
                setValue('onChainValidated', false);
                return;
            }

            const [ isValid, id ] = await Promise.all([ isValidUsername(userName), getIdByUserName(userName) ]);

            if (id > 0) {
                setValue('isValid', false);
                setValue('message', `${userName} ${t('minting_page.username_already_taken')}`);
                setValue('onChainValidated', true);
                return;
            }

            if (!isValid) {
                setValue('isValid', false);
                setValue('message', t('minting_page.username_invalid'));
                setValue('onChainValidated', true);
                return;
            }

            setValue('isValid', true);
            setValue('message', `${userName} ${t('minting_page.username_available')}`);
            setValue('onChainValidated', true);
        }
        catch (error) {
            setValue('isValid', false);
            setValue('message', 'An error occured');
            setValue('onChainValidated', true);
        }
    }), [ t, isValidUsername, getIdByUserName, setValue ]);

    const getCost = useCallback((async (userName: string) => {
        try {

            if (!validateUserNameLocally(userName)) {
                setValue('costVerified', false);
                setValue('costUSD', 0);
                setValue('costETH', 0);
                setValue('costCAW', 0);
                return;
            }

            const cost = await getCostOfName(userName);

            setValue('costUSD', cost.constInUsd);
            setValue('costETH', cost.costInEth);
            setValue('costCAW', cost.cost);
            setValue('costVerified', true);

        } catch (error) {
            setValue('message', 'An error occured while getting the cost');
            setValue('costVerified', false);
            setValue('costUSD', 0);
            setValue('costETH', 0);
            setValue('costCAW', 0);
        }
    }), [ getCostOfName, setValue ]);

    return (
        <Stack spacing={4}>
            <FormControl id="username">
                <FormLabel>{t('minting_page.enter_ntf_input_lb') + ':'}</FormLabel>
                <InputGroup>
                    <Input
                        {...register('userName', { required: true })}
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

