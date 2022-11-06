
import SideBar from 'src/components/sidebar';

type Props = {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {

    return (
        <SideBar>
            {children}
        </SideBar>
    );
}