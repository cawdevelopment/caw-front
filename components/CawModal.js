import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
const CawModal = ({ isOpenProp, onCloseProp }) => (
  <Modal
    blockScrollOnMount={false}
    size="xl"
    isOpen={isOpenProp}
    onClose={onCloseProp}
    isCentered
  >
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="20%"
      backdropBlur="2px"
    />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Input variant="filled" placeholder="Caw some Shit" />
      </ModalBody>

      <ModalFooter>
        <Box p="6" alignSelf="center" justifySelf="center">
          <Button variant="outline">
            <Text>Caw</Text>
          </Button>
        </Box>

        <Button colorScheme="blue" mr={3} onClick={onCloseProp}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
export default CawModal;
