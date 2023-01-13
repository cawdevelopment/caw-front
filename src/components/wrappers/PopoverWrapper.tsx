import { Hide, Show, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalHeader } from "@chakra-ui/react";

type Props = {
    children: React.ReactNode,
    isOpen: boolean,
    onClose: () => void
    isCentered?: boolean,
    wrapAbove: 'xs' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | 'full';
    scrollBehavior?: 'inside' | 'outside';
}

export default function PopoverWrapperInModal(props: Props) {

    const { children, isCentered, scrollBehavior = 'inside', isOpen, onClose, wrapAbove } = props;

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
                    </ModalContent>
                </Modal>
            </Hide>
            <Show above={wrapAbove}>
                {children}
            </Show>
        </>
    );
}