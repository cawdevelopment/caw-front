import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

type Props = {
    type: 'warning' | 'error' | 'success' | 'info' | 'loading';
    variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
    title?: string;
    message: string;
    showIcon?: boolean;
}

export default function AlertMessage({ type, title, message, variant, showIcon = true }: Props) {

    return (
        <Alert status={type} variant={variant}>
            {showIcon && <AlertIcon />}
            {title && (<AlertTitle>{title}</AlertTitle>)}
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}