import { Button } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

import Iconify from 'components/icons/Iconify';
import MenuPopover from 'components/MenuPopover';

export type Props = {
    postId: string;
    txId: string;
    onDelete?: VoidFunction;
}

export function PostMenu({ postId, txId, onDelete }: Props) {

    const { t } = useTranslation();

    const handleReport = () => {
        console.log('report');
    }

    const handleDelete = () => {
        onDelete?.();
    }

    const handleBlockScan = () => {
        window.open(`https://etherscan.io/tx/${txId}`, '_blank');
    }

    return (
        <MenuPopover>
            <Button
                w="194px"
                variant="ghost"
                leftIcon={<Iconify icon="eva:trash-fill" />}
                justifyContent="left"
                fontWeight="normal"
                fontSize="sm"
                onClick={handleDelete}
            >
                {t('buttons.btn_delete')}
            </Button>
            <Button
                w="194px"
                variant="ghost"
                leftIcon={<Iconify icon="ic:baseline-report" />}
                justifyContent="left"
                fontWeight="normal"
                fontSize="sm"
                onClick={handleReport}
            >
                {t('buttons.btn_report')}
            </Button>
            <Button
                w="194px"
                variant="ghost"
                leftIcon={<Iconify icon="simple-icons:ethereum" />}
                justifyContent="left"
                fontWeight="normal"
                fontSize="sm"
                onClick={handleBlockScan}
            >
                {t('buttons.btn_scan')}
            </Button>
        </MenuPopover>
    );
}
