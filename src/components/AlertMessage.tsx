import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

type Props = {
    type: 'warning' | 'error' | 'success' | 'info' | 'loading';
    variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
    title?: string;
    message: string;
}

export default function AlertMessage({ type, title, message, variant }: Props) {

    return (
        <Alert status={type} variant={variant}>
            <AlertIcon />
            {title && (<AlertTitle>{title}</AlertTitle>)}
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}