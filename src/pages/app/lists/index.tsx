import PageWrapper, { Layout } from 'src/components/wrappers/Page';

ListsPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function ListsPage() {
    return (
        <PageWrapper title="Lists">
            <div>
                <h1>Lists Page</h1>
            </div>
        </PageWrapper>
    );
}