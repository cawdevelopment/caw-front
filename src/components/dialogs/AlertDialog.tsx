import { useRef } from "react";
import {
    Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
    AlertDialogOverlay, AlertDialogCloseButton
} from '@chakra-ui/react';

type Props = {
    isOpen: boolean;
    title: string;
    body: string | React.ReactNode;
    cancelText?: string;
    cancelColorScheme?: string;
    confirmText?: string;
    confirmColorScheme?: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function AlertDialogConfirm(props: Props) {

    const { isOpen, title, body = `Are you sure? You can't undo this action afterwards.`, cancelText = 'Cancel', cancelColorScheme, confirmText = 'Confirm', confirmColorScheme = 'red', onClose } = props;
    const cancelRef = useRef<HTMLDivElement>();

    const handleConfirm = () => {
        onClose();
        props.onConfirm();
    }

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef as any}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />

                    <AlertDialogBody>
                        {body}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose} colorScheme={cancelColorScheme}>
                            {cancelText}
                        </Button>
                        <Button colorScheme={confirmColorScheme} onClick={handleConfirm} ml={3}>
                            {confirmText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}