import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
    TableContainer, Table, Thead, Tr, Th, Tbody, Td,
    Tooltip, TableCaption
} from "@chakra-ui/react";

import { actionCostAtMcap, NftCostAtMcap, getCurrentMCap, NFT_COST, ACTION_COST } from "src/utils/manifestoHelper";
import { kFormatter, fCurrency } from "src/utils/formatNumber";
import { uuidv4 } from "src/utils/helper";

const pThreshold = 0.009;
export default function ProtocolCost() {

    const { t } = useTranslation();
    const [ rows, setRows ] = useState<any[]>([]);
    const [ currentMc, setCurrentMc ] = useState<number>(0);

    useEffect(() => {

        let active = true;

        const cb = async () => {

            const currentMc = await getCurrentMCap();

            if (active)
                setCurrentMc(currentMc);
        }

        cb();

        return () => { active = false; };
    }, []);

    useEffect(() => {

        let active = true;
        const cb = async () => {

            const keys = Object.keys(NFT_COST);
            const _mctd = currentMc.toFixed(0);
            const mCaps = [ Number(_mctd), 50000000, 1000000000, 10000000000 ];

            let rows = keys.map((key) => {

                const length = Number(key);
                const _cost = NftCostAtMcap(length, mCaps);

                const _row: any = {};
                _row.id = uuidv4();
                _row.action = t('calc.mint_action').replace('{0}', length >= 8 ? '+' : '').replace('{1}', key).replace('{2}', length > 1 ? 's' : '');
                _row.distribution = `${kFormatter(NFT_COST[ key ])} CAW`;
                _row.TMC = _cost[ `${_mctd}` ];
                _row[ '50 mln' ] = _cost[ `50000000` ];
                _row[ '1 bln' ] = _cost[ '1000000000' ];
                _row[ '10 bln' ] = _cost[ '10000000000' ];

                return _row;
            });

            const _fCost = actionCostAtMcap('FOLLOW_ACC', mCaps);
            const _lCost = actionCostAtMcap('LIKECAW', mCaps);
            const _rcCost = actionCostAtMcap('RECAW', mCaps);
            const _scCost = actionCostAtMcap('SEND_CAW', mCaps);

            const _fRow: any = {
                id: uuidv4(),
                action: t('calc.follow_acc'),
                distribution: `${kFormatter(ACTION_COST.FOLLOW_ACC)} CAW ${t('calc.follow_acc_burn')}`,
                TMC: _fCost[ `${_mctd}` ],
                '50 mln': _fCost[ '50000000' ],
                '1 bln': _fCost[ '1000000000' ],
                '10 bln': _fCost[ '10000000000' ],
            };

            const _scRow: any = {
                id: uuidv4(),
                action: t('calc.send_caw'),
                distribution: `${kFormatter(ACTION_COST.SEND_CAW)} CAW ${t('calc.send_caw_burn')}`,
                TMC: _scCost[ `${_mctd}` ],
                '50 mln': _scCost[ '50000000' ],
                '1 bln': _scCost[ '1000000000' ],
                '10 bln': _scCost[ '10000000000' ],
            }


            const _lRow: any = {
                id: uuidv4(),
                action: t('calc.like_caw'),
                distribution: `${kFormatter(ACTION_COST.LIKECAW)} CAW ${t('calc.like_caw_burn')}`,
                TMC: _lCost[ `${_mctd}` ],
                '50 mln': _lCost[ '50000000' ],
                '1 bln': _lCost[ '1000000000' ],
                '10 bln': _lCost[ '10000000000' ],
            }

            const _rcRow: any = {
                id: uuidv4(),
                action: 'ReCAW',
                distribution: `${kFormatter(ACTION_COST.RECAW)} CAW ${t('calc.recaw_burn')}`,
                TMC: _rcCost[ `${_mctd}` ],
                '50 mln': _rcCost[ '50000000' ],
                '1 bln': _rcCost[ '1000000000' ],
                '10 bln': _rcCost[ '10000000000' ],
            }


            const actionRows = [ _fRow, _scRow, _lRow, _rcRow, ];
            rows = [ ...rows, ...actionRows ];

            if (active)
                setRows(rows);
        };

        cb();

        return () => { active = false; };

    }, [ currentMc, t ]);

    return (
        <TableContainer>
            <Table variant='simple' size='sm'>
                <TableCaption>
                    {t('calc.tbl_caption')} <br />
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>{t('calc.action')}</Th>
                        <Th>{t('calc.burns_dist')}</Th>
                        <Tooltip label={`${t('calc.MCTD')} : ${fCurrency(currentMc)}`} placement="top">
                            <Th isNumeric>MCTD</Th>
                        </Tooltip>
                        <Tooltip label={`${t('calc.MC50M')}`} placement="top">
                            <Th isNumeric>50 mln</Th>
                        </Tooltip>
                        <Tooltip label={`${t('calc.MC1B')}`} placement="top">
                            <Th isNumeric>1 bln</Th>
                        </Tooltip>
                        <Tooltip label={`${t('calc.MC10B')}`} placement="top">
                            <Th isNumeric>10 bln</Th>
                        </Tooltip>
                    </Tr>
                </Thead>
                <Tbody>
                    {rows.map((row, i) => {

                        const mct = Number(row.TMC || 0);
                        const mc50m = Number(row[ '50 mln' ] || 0);
                        const mc1b = Number(row[ '1 bln' ] || 0);
                        const mc10b = Number(row[ '10 bln' ] || 0);

                        const mctF = mct <= pThreshold ? 'na' : mct > 1 ? kFormatter(row.TMC) : mct.toFixed(4);
                        const mc50mF = mc50m <= pThreshold ? 'na' : mc50m > 1 ? kFormatter(row[ '50 mln' ]) : mc50m.toFixed(4);
                        const mc1bF = mc1b <= pThreshold ? 'na' : mc1b > 1 ? kFormatter(row[ '1 bln' ]) : mc1b.toFixed(4);
                        const mc10bF = mc10b <= pThreshold ? 'na' : mc10b > 1 ? kFormatter(row[ '10 bln' ]) : mc10b.toFixed(4);

                        return (
                        <Tr key={row.id}>
                            <Td>{row.action}</Td>
                            <Td>{row.distribution}</Td>
                                <Td isNumeric>
                                    <Tooltip label={fCurrency(mct)} isDisabled={mct <= 1000} >
                                        {mctF}
                                    </Tooltip>
                                </Td>
                                <Td isNumeric>
                                    <Tooltip label={fCurrency(mc50m)} isDisabled={mc50m <= 1000} >
                                        {mc50mF}
                                    </Tooltip>
                                </Td>
                                <Td isNumeric>
                                    <Tooltip label={fCurrency(mc1b)} isDisabled={mc1b <= 1000} >
                                        {mc1bF}
                                    </Tooltip>
                                </Td>
                                <Td isNumeric>
                                    <Tooltip label={fCurrency(mc10b)} isDisabled={mc10b <= 1000} >
                                        {mc10bF}
                                    </Tooltip>
                                </Td>
                        </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
