import React from 'react';
import { Layout, theme } from 'antd';

import styles from './MainLaouts.module.css';
import SidebarInline from '@/components/molecules/SidebarInline/SidebarInline';
import Navbar from '@/components/molecules/Navbar/Navbar';
import AppMain from '@/components/layouts/AppMain/AppMain';

const { Footer } = Layout;

const LayoutApp: React.FC = () => {
  const themeToken = theme.useToken();

  const render = () => {
    return (
      <Layout className={styles.layout} style={{ color: themeToken.token.colorText }}>
        <SidebarInline />
        <Layout>
          <Navbar />
          <AppMain />
          <Footer style={{ textAlign: 'center', padding: 14 }}>Copyright Notice</Footer>
        </Layout>
      </Layout>
    );
  };
  return render();
};

export default LayoutApp;
