import { useTranslation } from "react-i18next";
import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";

import ProtocolCost from "./ProtocolCost";

export type ProtocolCostModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProtocolCostModal({ isOpen, onClose }: ProtocolCostModalProps) {

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
          <br />
          {t('calc.title')}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ProtocolCost />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
