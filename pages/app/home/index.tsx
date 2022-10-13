
import PageWrapper, { Layout } from 'components/wrappers/Page';

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard" >{page}</Layout>;
};

export default function HomePage() {
  return (
    <PageWrapper title="Home">
      <div>
        <h1>Home page</h1>
      </div>
    </PageWrapper>
  );
}