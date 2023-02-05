import React, { useCallback, useMemo } from "react";
import NextLink from 'next/link';
import { useTranslation } from "react-i18next";
import {
    Avatar, Box, HStack, VStack, Text, Divider, Heading, Link, useColorModeValue, Spacer,
    Stack, CircularProgress, IconButton
} from "@chakra-ui/react";
import Iconify from "src/components/icons/Iconify";

import { useDappProvider } from "src/context/DAppConnectContext";
import { WalletBalanceModel } from "src/types/dtos";
import { fDecimal, kFormatter } from "src/utils/formatNumber";
import { BILLION } from 'src/utils/constants';
import { PATH_DASHBOARD } from "src/routes/paths";
import { useAccountBalance } from "src/hooks";
import { useMintingPageContext } from ".";

type AssetItemProps = {
    balance: WalletBalanceModel;
    hidden?: boolean;
}

function AssetItem({ balance, hidden }: AssetItemProps) {

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
                    <Text lineHeight={1} wordBreak="break-all" >
                        {
                            hidden ?
                                '******' :
                                `${fDecimal(amount)} ${amount >= BILLION ? ` | ${kFormatter(amount)}` : ''}`
                        }
                    </Text>
                </VStack>
            </HStack>
            <Divider />
        </Box>
    );
}

function WalletBalanceCard({ width }: { width: number }) {

    const { t } = useTranslation();
    const { hideBalance, setValue } = useMintingPageContext();
    const { address, chain, connected } = useDappProvider();
    const { assets, processing: fetchingBalance } = useAccountBalance({
        address: address || '',
        connected: connected,
        chainId: chain?.id || 0,
        chainName: chain?.name || ''
    });

    const handleShowBalance = useCallback(() => {
        setValue("hideBalance", !hideBalance);
    }, [ hideBalance, setValue ]);

    const sortedByAmount = useMemo(() => assets.sort((a, b) => b.amount - a.amount), [ assets ]);

    return (
        <Box width={width <= 0 ? 'full' : width} maxWidth={"container.md"}  >
            <Heading size="md" mb={2}>
                {fetchingBalance ?
                    <HStack>
                        <CircularProgress isIndeterminate color='caw.500' size="1.5rem" />
                        <Text>{t('minting_page.fetching_balance')}</Text>
                    </HStack>                    
                    : <HStack>
                        <span>{t('minting_page.main_balance')}</span>
                        <Spacer />
                        <IconButton
                            aria-label="More post options"
                            icon={<Iconify icon={hideBalance ? "eva:eye-off-fill" : "eva:eye-fill"} />}
                            variant="ghost"
                            onClick={handleShowBalance}
                            w="fit-content"
                        />
                    </HStack> 
                }
            </Heading>
            <Spacer h={10} />
            {sortedByAmount.map(asset => <AssetItem key={asset.symbol} balance={asset} hidden={hideBalance} />)}
            <Spacer h={10} />
            <Stack direction={{ base: 'column', md: 'column' }} spacing={2} align="center" justify="center" >
                <Text fontSize="sm" color="gray.500">
                    {t('minting_page.caw_balance_req_lb')}
                </Text>
                <Box p={5}>
                    <Link as={NextLink} href={PATH_DASHBOARD.swap.mcaw} color={'blue.400'}>
                            <b>{t('labels.getmcaw')}</b>
                    </Link>
                </Box>
            </Stack>
        </Box>
    );
}


export default React.memo(WalletBalanceCard);