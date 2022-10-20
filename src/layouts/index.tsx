import { ReactNode } from 'react';

import DashboardLayout from './DashboardLayout';
import LogoOnlyLayout from './LogoOnlyLayout';
import LandinLayout from './LandingLayout';

type Props = {
  children: ReactNode;
  variant: 'dashboard' | 'logoOnly' | 'landing';
};

export default function Layout({ variant = 'dashboard', children }: Props) {

  if (variant === 'dashboard') {
    return (
      <DashboardLayout>
        {children}
      </DashboardLayout>
    );
  }

  if (variant === 'landing') {
    return (
      <LandinLayout>
        {children}
      </LandinLayout>
    );
  }

  return (
    <LogoOnlyLayout>
      {children}
    </LogoOnlyLayout>
  );
}
