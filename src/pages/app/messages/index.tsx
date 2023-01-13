import PageWrapper, { Layout } from 'src/components/wrappers/Page';

MessagesPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function MessagesPage() {
    return (
        <PageWrapper title="Messages">
            <div>
                <h1>Messages page</h1>
            </div>
        </PageWrapper>
    );
}