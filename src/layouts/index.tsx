import { ReactNode, useState } from 'react';
import { useTranslation } from "react-i18next";

import DashboardLayout from './DashboardLayout';
import LogoOnlyLayout from './LogoOnlyLayout';
import LandinLayout from './LandingLayout';
import { Box, CloseButton, Slide } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  variant: 'dashboard' | 'logoOnly' | 'landing';
};

function WarningSlide() {

  const [ open, setOpen ] = useState(true);
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Slide direction='bottom' in={open} style={{ zIndex: 10 }}>
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

export default function Layout({ variant = 'dashboard', children }: Props) {

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
