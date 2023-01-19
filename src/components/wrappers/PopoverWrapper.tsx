import { Hide, Show, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalHeader, ModalFooter } from "@chakra-ui/react";

type Props = {
    children: React.ReactNode,
    footer?: React.ReactNode,
    isOpen: boolean,
    onClose: () => void
    isCentered?: boolean,
    wrapAbove: 'xs' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | 'full';
    scrollBehavior?: 'inside' | 'outside';
}

export default function PopoverWrapperInModal(props: Props) {

    const { children, footer, isCentered, scrollBehavior = 'inside', isOpen, onClose, wrapAbove } = props;

    return (
        <>
            <Hide above={wrapAbove}>
                <Modal
                    scrollBehavior={scrollBehavior}
                    isCentered={isCentered}
                    motionPreset={isCentered ? 'slideInBottom' : 'scale'}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader />
                        <ModalCloseButton />
                        <ModalBody>
                            {children}
                        </ModalBody>
                        <ModalFooter>
                            {footer}
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Hide>
            <Show above={wrapAbove}>
                {children}
            </Show>
        </>
    );
}