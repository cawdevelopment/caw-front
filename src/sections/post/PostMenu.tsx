import { Button, useColorModeValue, useToken } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

import Iconify from 'src/components/icons/Iconify';
import MenuPopover from 'src/components/MenuPopover';

export type Props = {
    postId: string;
    txId: string;
    onDelete?: VoidFunction;
}

export function PostMenu({ postId, txId, onDelete }: Props) {

    const { t } = useTranslation();
    const [ light, dark ] = useToken('colors', [ 'gray.600', 'gray.300' ]);
    const iconColor = useColorModeValue(light, dark);

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
                leftIcon={<Iconify icon="eva:trash-fill" color={iconColor} />}
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
                leftIcon={<Iconify icon="ic:baseline-report" color={iconColor} />}
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
                leftIcon={<Iconify icon="simple-icons:ethereum" color={iconColor} />}
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
