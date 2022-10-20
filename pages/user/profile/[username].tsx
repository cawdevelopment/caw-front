import PageWrapper, { Layout } from 'components/wrappers/Page';

PrivateUserPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function PrivateUserPage() {
    return (
        <PageWrapper title="Profile">
            <div>
                <h1>
                    Private profile page
                </h1>
            </div>
        </PageWrapper>
    );
}