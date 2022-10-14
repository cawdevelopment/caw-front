import { styled } from '@chakra-ui/react';
import Logo from '../components/Logo';

const Wrapper = styled('header', {
    baseStyle: {
        m: 5,
        lineHeight: 0,
        width: '100%',
    }
});

type Props = {
    children?: React.ReactNode;
};

export default function LogoOnlyLayout({ children }: Props) {
    return (
        <>
            <Wrapper>
                <Logo />
            </Wrapper>
            {children}
        </>
    );
}
