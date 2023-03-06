import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

import { sentenceCase } from "src/utils/helper";

export const AlertDialogConfirm = dynamic(() => import("src/components/dialogs/AlertDialog"), { ssr: false });


export function BrowserMessageModal({ isOpen, onClose, openConnectModal }: { isOpen: boolean; onClose: () => void; openConnectModal: () => void; }) {

  const { t } = useTranslation();
  return (
    <AlertDialogConfirm
      isOpen={isOpen}
      title=''
      cancelText={sentenceCase(t("verbs.cancel"))}
      confirmText={sentenceCase(t("verbs.continue"))}
      confirmColorScheme="blue"
      onClose={onClose}
      onConfirm={openConnectModal}
      body={<p> <b>{t('errors.mobileBrowserNotSupported')}</b></p>} />
  );
}
