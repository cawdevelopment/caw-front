import { ReactNode } from 'react';

import DashboardLayout from './DashboardLayout';
import LogoOnlyLayout from './LogoOnlyLayout';

type Props = {
  children: ReactNode;
  variant: 'dashboard' | 'logoOnly';
};

export default function Layout({ variant = 'dashboard', children }: Props) {

  if (variant === 'dashboard') {
    return (
      <DashboardLayout>
        {children}
      </DashboardLayout>
    );
  }

  return (
    <LogoOnlyLayout>
      {children}
    </LogoOnlyLayout>
  );
}
