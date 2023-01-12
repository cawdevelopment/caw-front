import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
    TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Modal, ModalContent,
    ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Tooltip, TableCaption
} from "@chakra-ui/react";

import { actionCostAtMcap, NftCostAtMcap, getCurrentMCap, NFT_COST, ACTION_COST } from "src/utils/manifestoHelper";
import { kFormatter, fCurrency } from "src/utils/formatNumber";
import { uuidv4 } from "src/utils/helper";

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

                const _tmc = Number(_cost[ `${_mctd}` ]);
                const _50mln = Number(_cost[ `50000000` ]);
                const _1bln = Number(_cost[ '1000000000' ]);
                const _10bln = Number(_cost[ '10000000000' ]);

                const _row: any = {};
                _row.id = uuidv4();
                // _row.action = `Mint ${length >= 8 ? '+' : ''}${key} Character${length > 1 ? 's' : ''} username`;
                _row.action = t('calc.mint_action').replace('{0}', length >= 8 ? '+' : '').replace('{1}', key).replace('{2}', length > 1 ? 's' : '');
                _row.distribution = `${kFormatter(NFT_COST[ key ])} CAW`;
                _row.TMC = _tmc > 1 ? kFormatter(_tmc) : _tmc.toFixed(4);
                _row[ '50 mln' ] = _50mln > 1 ? kFormatter(_50mln) : _50mln.toFixed(4);
                _row[ '1 bln' ] = _1bln > 1 ? kFormatter(_1bln) : _1bln.toFixed(4);
                _row[ '10 bln' ] = _10bln > 1 ? kFormatter(_10bln) : _10bln.toFixed(4);

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
                TMC: _fCost[ `${_mctd}` ] > 1 ? kFormatter(_fCost[ `${_mctd}` ]) : _fCost[ `${_mctd}` ].toFixed(4),
                '50 mln': _fCost[ '50000000' ] > 1 ? kFormatter(_fCost[ '50000000' ]) : _fCost[ '50000000' ].toFixed(4),
                '1 bln': _fCost[ '1000000000' ] > 1 ? kFormatter(_fCost[ '1000000000' ]) : _fCost[ '1000000000' ].toFixed(4),
                '10 bln': _fCost[ '10000000000' ] > 1 ? kFormatter(_fCost[ '10000000000' ]) : _fCost[ '10000000000' ].toFixed(4),
            };

            const _scRow: any = {
                id: uuidv4(),
                action: t('calc.send_caw'),
                distribution: `${kFormatter(ACTION_COST.SEND_CAW)} CAW ${t('calc.send_caw_burn')}`,
                TMC: _scCost[ `${_mctd}` ] > 1 ? kFormatter(_scCost[ `${_mctd}` ]) : _scCost[ `${_mctd}` ].toFixed(4),
                '50 mln': _scCost[ '50000000' ] > 1 ? kFormatter(_scCost[ '50000000' ]) : _scCost[ '50000000' ].toFixed(4),
                '1 bln': _scCost[ '1000000000' ] > 1 ? kFormatter(_scCost[ '1000000000' ]) : _scCost[ '1000000000' ].toFixed(4),
                '10 bln': _scCost[ '10000000000' ] > 1 ? kFormatter(_scCost[ '10000000000' ]) : _scCost[ '10000000000' ].toFixed(4),
            }


            const _lRow: any = {
                id: uuidv4(),
                action: t('calc.like_caw'),
                distribution: `${kFormatter(ACTION_COST.LIKECAW)} CAW ${t('calc.like_caw_burn')}`,
                TMC: _lCost[ `${_mctd}` ] > 1 ? kFormatter(_lCost[ `${_mctd}` ]) : _lCost[ `${_mctd}` ].toFixed(4),
                '50 mln': _lCost[ '50000000' ] > 1 ? kFormatter(_lCost[ '50000000' ]) : _lCost[ '50000000' ].toFixed(4),
                '1 bln': _lCost[ '1000000000' ] > 1 ? kFormatter(_lCost[ '1000000000' ]) : _lCost[ '1000000000' ].toFixed(4),
                '10 bln': _lCost[ '10000000000' ] > 1 ? kFormatter(_lCost[ '10000000000' ]) : _lCost[ '10000000000' ].toFixed(4),
            }

            const _rcRow: any = {
                id: uuidv4(),
                action: 'ReCAW',
                distribution: `${kFormatter(ACTION_COST.RECAW)} CAW ${t('calc.recaw_burn')}`,
                TMC: _rcCost[ `${_mctd}` ] > 1 ? kFormatter(_rcCost[ `${_mctd}` ]) : _rcCost[ `${_mctd}` ].toFixed(4),
                '50 mln': _rcCost[ '50000000' ] > 1 ? kFormatter(_rcCost[ '50000000' ]) : _rcCost[ '50000000' ].toFixed(4),
                '1 bln': _rcCost[ '1000000000' ] > 1 ? kFormatter(_rcCost[ '1000000000' ]) : _rcCost[ '1000000000' ].toFixed(4),
                '10 bln': _rcCost[ '10000000000' ] > 1 ? kFormatter(_rcCost[ '10000000000' ]) : _rcCost[ '10000000000' ].toFixed(4),
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
                    {rows.map((row, i) => (
                        <Tr key={row.id}>
                            <Td>{row.action}</Td>
                            <Td>{row.distribution}</Td>
                            <Td isNumeric>{row.TMC}</Td>
                            <Td isNumeric>{row[ '50 mln' ]}</Td>
                            <Td isNumeric>{row[ '1 bln' ]}</Td>
                            <Td isNumeric>{row[ '10 bln' ]}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

type ProtocolCostModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export function ProtocolCostModal({ isOpen, onClose }: ProtocolCostModalProps) {

    const { t } = useTranslation();
    return (
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            size="6xl"
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {t('calc.title')}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ProtocolCost />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>
                        {t('buttons.btn_close')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

// export function ProtocolCostModal({ children, style }: ProtocolCostModalProps) {

//     const { t } = useTranslation();
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const btnRef = useRef(null)

//     return (
//         <>
//             <div
//                 style={style}
//                 onClick={onOpen}
//                 ref={btnRef}
//             >
//                 {children}
//             </div>
//             <Modal
//                 isCentered
//                 onClose={onClose}
//                 finalFocusRef={btnRef}
//                 isOpen={isOpen}
//                 size="6xl"
//                 scrollBehavior="inside"
//             >
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>
//                         Cost and burns at different MC's
//                     </ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <ProtocolCost />
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button onClick={onClose}>
//                             {t('buttons.btn_close')}
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );

// }
