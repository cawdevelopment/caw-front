import { Wrap, WrapItem } from '@chakra-ui/react'
import { useTranslation } from "react-i18next";

import { useToast } from 'src/hooks';
import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import { useDappProvider } from "src/context/DAppConnectContext";
import NftUsernameCard from 'src/components/NftUsernameCard';
import Block from "src/components/Block";

UserProfilePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function UserProfilePage() {

    const { cawAccounts, changeCawAccount } = useDappProvider();
    const { t } = useTranslation();
    const toast = useToast();

    const handleCawAccountChange = (username: string) => {


        try {
            const acc = cawAccounts.find((acc) => acc.userName === username);
            if (!acc)
                return;

            changeCawAccount(acc, true);
            toast.closeAll();
            toast({
                description: t('labels.connectedto') + ' : ' + username,
                status: 'success',
                variant: 'solid',
                position: 'bottom',
                duration: 2300,
                isClosable: true,
            });
        }
        catch (error: any) {
            toast.closeAll();
            toast({
                description: error?.message || 'Something went wrong',
                status: 'error',
                variant: 'subtle',
                position: 'bottom',
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return (
        <PageWrapper title={t('private_profile_page.accounts')}>
            <Block
                title={t('private_profile_page.accounts')}
                subtitle={`${t('private_profile_page.accounts_subtitle')} : (${cawAccounts.length}) `}
            >
                <Wrap id="profiles-wrapper" justify={"space-between"}>
                    {cawAccounts.map((acc) => (
                        <WrapItem
                            key={acc.userName}
                            id={acc.userName}
                        >
                            <NftUsernameCard
                                avatar={acc.avatar}
                                userId={acc.id}
                                username={acc.userName}
                                onConnect={handleCawAccountChange}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            </Block>
        </PageWrapper>
    );
}