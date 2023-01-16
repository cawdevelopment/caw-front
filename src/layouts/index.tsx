import { useTranslation } from "react-i18next";
import { Box, CloseButton, Slide } from "@chakra-ui/react";
import type { FC, ReactNode } from 'react';

import { useLocalStorage } from "src/hooks";
import DashboardLayout from './DashboardLayout';
import LogoOnlyLayout from './LogoOnlyLayout';
import LandinLayout from './LandingLayout';

type Props = {
  children: ReactNode;
  variant: 'dashboard' | 'logoOnly' | 'landing';
};

function WarningSlide() {

  const { t } = useTranslation();
  const [ noticedClose, setNotice ] = useLocalStorage<boolean>("developmentNotice", false);

  const handleClose = () => setNotice(true);

  return (
    <Slide direction='bottom' in={!noticedClose} style={{ zIndex: 10 }}>
      <Box
        p='40px'
        color='white'
        mt='4'
        bg='orange.500'
        rounded='md'
        shadow='md'
      >
        <CloseButton size='lg' onClick={handleClose} />
        {t('layout_page.text_1')}
        <br />
        {t('layout_page.text_2')}
      </Box>
    </Slide>
  );
}

// export default function Layout({ variant = 'dashboard', children }: Props) {
const Layout: FC<Props> = ({ variant = 'dashboard', children }) => {
  if (variant === 'dashboard') {
    return (
      <DashboardLayout>
        {children}       
        <WarningSlide />
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
      <WarningSlide />
    </LogoOnlyLayout>
  );
  }

export default Layout;
