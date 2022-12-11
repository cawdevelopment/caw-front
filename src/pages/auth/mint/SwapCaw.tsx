import { ChangeEvent, useEffect, useState } from "react";
import {
    Spacer, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper, InputGroup, InputRightAddon, Button
} from "@chakra-ui/react";

import { kFormatter } from 'src/utils/formatNumber';
import { MILLION } from 'src/utils/constants';

type Props = {
    swapAmount: number;
    onChange: (value: number) => void;
}

export default function SwapCAW({ swapAmount, onChange }: Props) {

    const [ amount, setAmount ] = useState(MILLION);

    useEffect(() => {
        setAmount(swapAmount > 0 ? swapAmount : MILLION);
    }, [ swapAmount ])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setAmount(value);
        onChange(value);
    }

    return (
        <InputGroup size='lg'>
            <NumberInput
                value={amount}
                min={MILLION}
                step={MILLION * 10}
                precision={2}
                clampValueOnBlur={false}
                size='lg'
            >
                <NumberInputField
                    placeholder="Enter CAW amount"
                    onChange={handleChange}
                />
                <NumberInputStepper
                    onChange={(e) => {
                        console.log('increment', e.target);
                    }}
                >
                    <NumberIncrementStepper
                        bg='green.300'
                        _active={{ bg: 'green.300' }}
                        children='+'
                        onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('increment', e.target);
                        }}
                    />
                    <NumberDecrementStepper
                        bg='pink.200'
                        _active={{ bg: 'pink.300' }}
                        children='-'

                    />
                </NumberInputStepper>
            </NumberInput>
            <InputRightAddon children={kFormatter(swapAmount)} />
            <Spacer w={10} />
            <Button
                colorScheme={'blue'}
            >
                Swap
            </Button>
        </InputGroup>
    );
}