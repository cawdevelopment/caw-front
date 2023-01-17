import PageWrapper, { Layout } from 'src/components/wrappers/Page';

PrivateUserPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function PrivateUserPage() {
    return (
        <PageWrapper title="Profile">
            <div>
                <h1>
                    Public profile page
                </h1>
            </div>
        </PageWrapper>
    );
}