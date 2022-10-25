import PageWrapper, { Layout } from 'src/components/wrappers/Page';

ExplorePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard" >{page}</Layout>;
};

export default function ExplorePage() {
    return (
        <PageWrapper title="Explore">
            <div>
                <h1>Explore page</h1>                
            </div>
        </PageWrapper>
    );
}