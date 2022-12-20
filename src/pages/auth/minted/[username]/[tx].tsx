import { useEffect, useState } from "react";
import { Container, Center, HStack, Button, Divider, Spacer, Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { PATH_AUTH } from "src/routes/paths";
import { WrapperFadeAnimation } from 'src/components/animate'
import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import { useCawProvider } from "src/context/WalletConnectContext";
import { getExplorerUrl, getOpenSeaUrl } from 'src/hooks/contractHelper'
import useCawNamesContract from "src/hooks/useCawNamesContract";
import useAppConfigurations from "src/hooks/useAppConfigurations";
import useCawNameMinterContract from "src/hooks/useCawNameMinterContract";

import LoaderCard from "./LoaderCard";
import NtfNameCard from "./NtfNameCard";

MintedUserNamePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

export type Props = {
    userName: string;
    image: string;
    blockExplorerUrl: string;
    openSeaUrl: string;
}

export default function MintedUserNamePage() {

    const { contracts: { CAW_NAME: { address: cawNamesAddress } } } = useAppConfigurations();
    const { initialized: cMinterInitialized, getIdByUserName } = useCawNameMinterContract();
    const { initialized: cNamesInitialized, read: { getTokenURI } } = useCawNamesContract();
    const router = useRouter();
    const { username: userName, tx: transactionHash } = router.query || {};

    const [ loading, setLoading ] = useState(true);
    const [ userId, setUserId ] = useState(0);
    const [ image, setImage ] = useState('');
    const [ error, setError ] = useState('');
    const { chain } = useCawProvider();
    const { t } = useTranslation();


    const ntfURL = getOpenSeaUrl(chain?.id || 0, cawNamesAddress, userId);
    const explorerUrl = getExplorerUrl({
        network: chain?.id || 0,
        addressOrTx: transactionHash as string,
        type: 'tx'
    });


    useEffect(() => {

        let active = true;

        if (!cMinterInitialized)
            return;

        const cb = async () => {
            try {
                setLoading(true)
                const id = await getIdByUserName(userName as string);

                if (!active)
                    return;

                setUserId(id);
                setLoading(false);
            }
            catch (error: any) {
                console.error("error : ", error);
                if (!active)
                    return;

                setLoading(false);
                setError(error?.message || 'Something went wrong');
            }
        }

        cb();

        return () => { active = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ cMinterInitialized, userName ]);

    useEffect(() => {

        let active = true;
        if (!cNamesInitialized)
            return;


        const cb = async () => {
            try {

                setLoading(true);
                if (userId <= 0)
                    return;

                const uri = await getTokenURI(userId);
                console.log("uri : ", uri);

                if (!active)
                    return;

                setImage(uri.image);
                setLoading(false);
            }
            catch (error: any) {
                console.error("error : ", error);
                if (!active)
                    return;

                setError('Could not fetch image : ' + (error?.message || '') + ', however you can still check your NFT on the block explorer and OpenSea');
                setLoading(false);
            }
        }

        cb();

        return () => { active = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ cNamesInitialized, userId ]);

    return (
        <PageWrapper title={t('minted_page.title')}>
            <Container w="container.lg" maxW={"container.xl"} h="container.lg" pt={10}>
                <WrapperFadeAnimation show={Boolean(error)} >
                    <Center>
                        <Text fontSize="xl" fontWeight="bold" color="tomato">
                            {error}
                        </Text>
                    </Center>
                </WrapperFadeAnimation>
                <WrapperFadeAnimation show={loading} >
                    <LoaderCard />
                </WrapperFadeAnimation>
                <WrapperFadeAnimation show={!loading}>
                    <Box>
                        <NtfNameCard
                            blockExplorerUrl={explorerUrl}
                            openSeaUrl={ntfURL}
                            image={image}
                            userName={userName as string}
                        />
                        <Divider />
                        <Spacer h={10} />
                        <Center>
                            <HStack spacing={2}>
                                <NextLink href={PATH_AUTH.mint} passHref>
                                    <Button colorScheme='caw'>
                                        {t('buttons.btn_start_over')}
                                    </Button>
                                </NextLink>
                                <NextLink href={PATH_AUTH.connect} passHref>
                                    <Button colorScheme='caw' variant="outline">
                                        {t('buttons.btn_access')}
                                    </Button>
                                </NextLink>
                            </HStack>
                        </Center>
                    </Box>
                </WrapperFadeAnimation>
            </Container>
        </PageWrapper>
    );
}