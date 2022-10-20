import PageWrapper, { Layout } from 'src/components/wrappers/Page';

UserProfilePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function UserProfilePage() {
    return (
        <PageWrapper title="My profile">
            <div>
                <h1>My profile</h1>
            </div>
        </PageWrapper>
    );
}