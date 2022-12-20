import { useState } from "react";
import { useBalance } from "wagmi";
import NextLink from 'next/link';
import { useTranslation } from "react-i18next";
import { Avatar, Box, HStack, VStack, Text, Divider, Heading, useColorModeValue, Spacer, Button, Stack } from "@chakra-ui/react";

import { useCawProvider } from "src/context/WalletConnectContext";
import useAppConfigurations from "src/hooks/useAppConfigurations";
import { WalletBalanceModel } from "src/types/dtos";
import { fDecimal, kFormatter } from "src/utils/formatNumber";
import { BILLION } from 'src/utils/constants';
import { PATH_DASHBOARD } from "src/routes/paths";

const defaultBalance: WalletBalanceModel[] = [
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

function AssetItem({ balance }: { balance: WalletBalanceModel }) {

    const { symbol, name, amount } = balance;
    const symbolForeColor = useColorModeValue('gray.500', 'gray.400');

    return (
        <Box>
            <HStack p={2}>
                <Avatar size="sm" name={name} src={`/assets/tokens/${symbol.toLowerCase()}.png`} />
                <Text textAlign={"left"}>
                    <b>{`${name} `}</b>
                    <Text as="span" color={symbolForeColor}>
                        {symbol}
                    </Text>
                </Text>
                <VStack alignItems={"flex-end"}>
                    <Text>{`${fDecimal(amount)} ${amount >= BILLION ? ` | ${kFormatter(amount)}` : ''}`}</Text>
                </VStack>
            </HStack>
            <Divider />
        </Box>
    );
}

export default function WalletBalanceCard() {

    const { address, chain } = useCawProvider();
    const { contracts: { CAW, MINTABLE_CAW } } = useAppConfigurations();
    const [ assets, setAssets ] = useState<WalletBalanceModel[]>(defaultBalance);
    const { t } = useTranslation();

    const { isFetching: fetchingETH } = useBalance({
        addressOrName: address, chainId: chain?.id, watch: false,
        onSuccess(data) { updateBalance(data, 'ETH', 'Ethereum'); },
    });

    const { isFetching: fetcinghCAW } = useBalance({
        addressOrName: address, token: CAW.address, chainId: chain?.id, watch: false,
        onSuccess(data) { updateBalance(data, 'CAW', 'A Hunters Dream'); },
    });

    const { isFetching: fetchingMCAW } = useBalance({
        addressOrName: address, token: MINTABLE_CAW.address, chainId: chain?.id, watch: false,
        onSuccess(data) { updateBalance(data, 'MCAW', 'Mintable CAW'); },
    });


    function updateBalance(data: any, symbol: string, name: string) {
        setAssets(prev => {
            const asset = prev.find(a => (a.symbol || '').toUpperCase() === symbol.toUpperCase());
            if (asset) {
                asset.amount = Number(data?.formatted || 0);
                return prev;
            }

            return [ ...prev, { symbol: symbol, name: name, amount: Number(data?.formatted || 0) } ];
        });
    }

    const sortedByAmount = assets.sort((a, b) => b.amount - a.amount);
    return (
        <Box width={"container.md"} >
            <Heading size="md" mb={2}>
                {(fetchingETH || fetcinghCAW || fetchingMCAW) ? t('minting_page.upding_balance') : t('minting_page.main_balance')}
            </Heading>
            <Spacer h={10} />
            {sortedByAmount.map(asset => <AssetItem key={asset.symbol} balance={asset} />)}
            <Spacer h={10} />
            <Stack direction={{ base: 'column', md: 'row' }} spacing={2} align="center" justify="center" >
                <Text fontSize="sm" color="gray.500">
                    {t('minting_page.caw_balance_req_lb')}
                </Text>
                <NextLink href={PATH_DASHBOARD.swap.mcaw} target="_blank" passHref >
                    <Button
                        variant="link"
                        colorScheme="gray"
                    >
                        {t('buttons.btn_swap')}
                    </Button>
                </NextLink>
            </Stack>
        </Box>
    );
}

