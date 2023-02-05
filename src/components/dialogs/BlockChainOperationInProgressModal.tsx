import { CircularProgressProps, Text, Code } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import OperationInProgressModal from "./OperationInProgress";

export type BCOProps = {
  message: string;
  processing: boolean;
  txSent: boolean;
  circularProps?: CircularProgressProps;
  onClose: () => void;
}

export default function BlockChainOperationInProgressModal({ processing, txSent, onClose, message, circularProps }: BCOProps) {
  const { t } = useTranslation();
  return (
    <OperationInProgressModal
      isOpen={processing}
      title={txSent ? t('wallet.txSubmitted') : t('wallet.waitingConfirm')}
      message={message}
      footer={txSent ? <Text>{t('wallet.waitConfirmedTx')}</Text> : <Code colorScheme={"red"}> {t('wallet.confirmTxInWallet')}</Code>}
      circularProps={circularProps}
      onClose={onClose} />
  );
}
