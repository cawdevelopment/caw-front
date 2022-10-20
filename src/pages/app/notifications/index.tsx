import PageWrapper, { Layout } from 'src/components/wrappers/Page';

NotificationsPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function NotificationsPage() {
    return (
        <PageWrapper title="Notifications">
            <div>
                <h1>Notifications page</h1>
            </div>
        </PageWrapper>
    );
}