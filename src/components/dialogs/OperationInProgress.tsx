import {
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter,
  Heading, Text, CircularProgress, CircularProgressProps, VStack
} from "@chakra-ui/react";

type Props = {
  title: string;
  message: string;
  footer: string | React.ReactNode;
  isOpen: boolean;
  circularProps?: CircularProgressProps;
  onClose: () => void;
}

export default function OperationInProgressModal(props: Props) {

  const { title, message, footer, isOpen, onClose,
    circularProps = {
      isIndeterminate: true,
      size: '80px',
      thickness: '4px',
      color: 'blue.500',
    } } = props;

  return (
    <Modal
      isCentered
      motionPreset='slideInBottom'
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            justifyContent={'center'}
          >
            <CircularProgress {...circularProps} />
            <Heading as='h4' size='md'>{title}</Heading>
            <Text pt={4} >{message}</Text>
          </VStack>
        </ModalBody>
        <ModalFooter
          justifyContent={'center'}
        >
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
