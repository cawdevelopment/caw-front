import { Button, ButtonProps } from '@chakra-ui/react';

export default function StyledButton(props: ButtonProps) {
    return (
        <Button
            variant="contained"
            bg="caw.600"
            color={'gray.900'}
            size='sm'
            boxShadow='2xl'
            textTransform={'capitalize'}
            {...props}
        />
    );
}