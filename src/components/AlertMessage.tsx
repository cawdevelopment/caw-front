import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, ResponsiveValue, Spacer, useDisclosure } from "@chakra-ui/react";
import { WrapperFadeAnimation } from "./animate";

type Props = {
    type: 'warning' | 'error' | 'success' | 'info' | 'loading';
    variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
    title?: string;
    message: string;
    showIcon?: boolean;
    showCloseButton?: boolean;
    maxWidth?: ResponsiveValue<string | number>;
}

export default function AlertMessage({ type, title, message, variant, showIcon = true, maxWidth, showCloseButton = false }: Props) {

    const { isOpen: isVisible, onClose, } = useDisclosure({ defaultIsOpen: true });

    return (
        <WrapperFadeAnimation
            show={isVisible}
            exitDuration={0.5}
        >
            <Alert
                maxWidth={maxWidth}
                status={type}
                variant={variant}
            >
                {showIcon && <AlertIcon />}
                <Box>
                    {title && (<AlertTitle>{title}</AlertTitle>)}
                    <AlertDescription>{message}</AlertDescription>
                </Box>
                <Spacer />
                {showCloseButton && (
                    <CloseButton
                        alignSelf='flex-start'
                        position='relative'
                        right={-1}
                        top={-1}
                        onClick={onClose}
                    />
                )}
            </Alert>
        </WrapperFadeAnimation>
    );
}