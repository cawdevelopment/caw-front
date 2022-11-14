import { Box, Button, Container, Stack, Text, Center, FormControl, FormLabel, Input, Checkbox, Highlight, Flex, useColorModeValue, Heading, Link, Code, Divider, Spacer, Progress, ButtonGroup, chakra, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CheckIcon, InfoIcon, CloseIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NextLink from 'next/link';
import { m, AnimatePresence } from "framer-motion";

import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import NavbarAccount from 'src/components/sidebar/NavbarAccount';
import { PATH_AUTH } from "src/routes/paths";
import { useWallet } from "src/context/WalletConnectContext";
import { MotionContainer, varFade, varTranEnter } from "src/components/animate";
import { animation } from './connect'
import { useDebounce } from "use-debounce";
import { isValidUsername } from "src/utils/helper";

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

function NftPriceLegend() {
    const color = useColorModeValue('gray.800', 'gray.200');
    return (
        <Text fontSize={'lg'} color={color}>
            The <b>shorter</b> the username, the more <Link color={'blue.400'}> <b>expensive</b></Link> it will be.
        </Text>
    );
}

function CheckWalletCard() {

    const { t } = useTranslation();
    const { connected } = useWallet();

    return (
        <Stack spacing={8}>
            <Box textAlign="center" py={10} px={6}>
                <InfoIcon boxSize={'50px'} color={'blue.500'} />
                <Heading as="h2" size="md" mt={6} mb={2}>
                    {connected ? '' :
                        <>
                            {t('minting_page.step_title')} <Link color={'blue.400'}>{t('minting_page.step_title_wallet')}</Link>
                        </>
                    }
                </Heading>
                <Text color={'gray.500'}>
                    {t('minting_page.step_description')}
                </Text>
                <Spacer h={10} />
                <Stack direction='column' textAlign={"left"}>
                    <Code colorScheme='yellow' children="All user activity, social and financial flows through your NFT username" />
                    <Code children={`So for your sake, don't get smart and don't try to hack these mechanism`} />
                    <Code colorScheme="teal" children={`You can mint as many as you can afford it `} />
                </Stack>
                <Spacer h={10} />
                <NftPriceLegend />
                <Spacer h={10} />
                <NavbarAccount displayAddressMode="full" />
            </Box>
        </Stack>
    );
}


type UserAcceptanceProps = {
    onUserAcceptance: (accepted: boolean) => void,
}

const warnings = [
    'You are responsible for your own funds.',
    'You are responsible for your own username and your actions.',
    'Power given to you, with great power comes great responsibility',
]

function UserAcceptance({ onUserAcceptance }: UserAcceptanceProps) {

    const [ checkedItems, setCheckedItems ] = useState(warnings.map(c => false))

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    useEffect(() => {
        onUserAcceptance(allChecked)
    }, [ allChecked ])

    return (
        <chakra.div pt={10}>
            <Text pb={2}>
                Before continuing, you should know and accept the following:
            </Text>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems(checkedItems.map(() => e.target.checked))}
            >
                This is a <Link color={'blue.400'}><b>decentralized application </b></Link>, therefore
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {warnings.map((caption, index) => (
                    <Checkbox
                        key={index}
                        isChecked={checkedItems[ index ]}
                        onChange={(e) => setCheckedItems(checkedItems.map((c, i) => i === index ? e.target.checked : c))}
                    >
                        {caption}
                    </Checkbox>
                ))}
            </Stack>
        </chakra.div>
    )
}

type MintUserNameCardProps = {
    userName: string,
    onUserNameChange: (username: string) => void,
    onUserAcceptance: (accepted: boolean) => void,
}

function MintUserNameCard({ userName, onUserNameChange, onUserAcceptance }: MintUserNameCardProps) {

    const [ value, setValue ] = useState('');
    const handleChange = (event: any) => setValue(event.target.value);
    const [ debouncedValue ] = useDebounce(value, 500);
    const { t } = useTranslation();
    const validUserName = isValidUsername(debouncedValue);

    useEffect(() => {
        setValue(userName)
    }, [ userName ])

    useEffect(() => {
        onUserNameChange(debouncedValue)
    }, [ debouncedValue ])

    return (
        <Stack spacing={4}>
            <FormControl id="username">
                <FormLabel>Enter your new NTF-Username:</FormLabel>
                <InputGroup>
                    <Input
                        size='lg'
                        variant='filled'
                        type="text"
                        value={value}
                        onChange={handleChange}
                    />
                    <InputRightElement alignItems={"center"} children={value ? (validUserName ? <CheckIcon color='green.500' /> : <CloseIcon color='red.500' />) : null} />
                </InputGroup>
            </FormControl>
            <Spacer h={20} />
            <Stack spacing={1}>
                <NftPriceLegend />
                <UserAcceptance onUserAcceptance={onUserAcceptance} />
            </Stack>
        </Stack>
    );
}

function BlockExplorerCard() {

    const { t } = useTranslation();
    return (
        <Stack spacing={4}>
            <Text fontSize={'lg'} color={'gray.600'}>
                Check your NFT on the <Link color={'blue.400'}> <b>block explorer</b></Link>
            </Text>
            <Button
                bg={'caw.600'}
                color={'white'}
                _hover={{
                    bg: 'caw.500',
                }}>
                {t('buttons.btn_explore_tx')}
            </Button>
        </Stack>
    );
}

function MintNameFormCard() {

    const bg = useColorModeValue('gray.50', 'gray.800');
    const boxBg = useColorModeValue('white', 'gray.700');
    const [ step, setStep ] = useState(1);
    const [ progress, setProgress ] = useState(33.33);
    const { t } = useTranslation();
    const toast = useToast();
    const { connected } = useWallet();

    const [ userName, setUserName ] = useState('');
    const [ termsAccepted, setTermsAccepted ] = useState(false);
    const validUserName = isValidUsername(userName);


    const handleUserNameChange = (username: string) => setUserName(username);
    const handleTermsAcceptedChange = (accepted: boolean) => setTermsAccepted(accepted);

    return (
        <MotionContainer>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={bg}
            >
                <Stack spacing={5} mx={'auto'} maxW={'full'} py={6} px={6}>
                    <Stack align={'center'}>
                        <Text
                            bgGradient="linear(to-l, #7928CA, #FF0080)"
                            bgClip="text"
                            fontSize="3xl"
                            fontWeight="extrabold"
                            p="9"
                            align="center"
                            opacity="0"
                            as={m.div}
                            animation={animation}
                        >
                            {t('minting_page.message')}
                        </Text>
                    </Stack>
                    <Progress
                        value={progress}
                        colorScheme="caw"
                        mb="5%"
                        mx="5%"
                        borderRadius={10}
                    />
                    <Box
                        bg={boxBg}
                        rounded={'lg'}
                        boxShadow={'2xl'}
                        p={8}
                    >
                        <AnimatePresence>
                            {step === 1 ?
                                <CheckWalletCard />
                                : step === 2 ?
                                    <MintUserNameCard
                                        userName={userName}
                                        onUserNameChange={handleUserNameChange}
                                        onUserAcceptance={handleTermsAcceptedChange}
                                    /> :
                                    <BlockExplorerCard />
                            }
                        </AnimatePresence>
                        <ButtonGroup mt="5%" w="100%">
                            <Flex w="100%" justifyContent="space-between">
                                <Button
                                    onClick={() => {
                                        setStep(step - 1);
                                        setProgress(progress - 33.33);
                                    }}
                                    isDisabled={step === 1}
                                    colorScheme="caw"
                                    variant="solid"
                                    w="7rem"
                                    mr="5%"
                                >
                                    {t('buttons.btn_back')}
                                </Button>
                                {step !== 3 && (
                                    <Button
                                        w="7rem"
                                        isDisabled={step === 1 ? !connected : step === 2 ? (!validUserName || !termsAccepted) : false}
                                        onClick={() => {
                                            setStep(step + 1);
                                            if (step === 3) {
                                                setProgress(100);
                                            } else {
                                                setProgress(progress + 33.33);
                                            }
                                        }}
                                        colorScheme="caw"
                                        variant="outline">
                                        {t('buttons.btn_next')}
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button
                                        w="7rem"
                                        colorScheme="red"
                                        variant="solid"
                                        disabled={!connected || !termsAccepted || !validUserName}
                                        onClick={() => {
                                            toast({
                                                title: 'Account created.',
                                                description: "We've created your account for you.",
                                                status: 'success',
                                                duration: 3000,
                                                isClosable: true,
                                            });
                                        }}>
                                        {t('buttons.btn_mint')}
                                    </Button>
                                )}
                            </Flex>
                        </ButtonGroup>
                    </Box>
                    <Spacer />
                    <Flex>
                        <Spacer />
                        <NextLink href={PATH_AUTH.connect} passHref>
                            <Link color={'blue.400'}>{t('minting_page.already_minted')}</Link>
                        </NextLink>
                    </Flex>
                </Stack>
            </Flex>
        </MotionContainer >
    );
}

export default function RegisterPage() {

    const { t } = useTranslation();

    return (
        <PageWrapper title="Mint your username">
            <Container w="full" maxW={"container.xl"} h="container.lg" p={10}>
                <MintNameFormCard />
            </Container>
        </PageWrapper>
    );
}