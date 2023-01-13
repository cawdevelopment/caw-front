import PageWrapper, { Layout } from 'src/components/wrappers/Page';

BookmarksPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function BookmarksPage() {
    return (
        <PageWrapper title="Bookmarks">
            <div>
                <h1>Bookmarks page</h1>
            </div>
        </PageWrapper>
    );
}