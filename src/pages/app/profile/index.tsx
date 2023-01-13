import PageWrapper, { Layout } from 'src/components/wrappers/Page';
import Avatars from 'src/sections/post/Avatars';

UserProfilePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="dashboard">{page}</Layout>;
};

export default function UserProfilePage() {
    return (
        <PageWrapper title="My profile">
            <div>
                <h1>My accounts</h1>
                <Avatars />
            </div>
        </PageWrapper>
    );
}