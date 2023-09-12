import React from 'react';
import { Layout, theme } from 'antd';

import AppMain from '@/components/layouts/AppMain/AppMain';

const { Footer } = Layout;

const LayoutApp: React.FC = () => {
  const themeToken = theme.useToken();

  const render = () => {
    return (
      <Layout className="layout" style={{ color: themeToken.token.colorText }}>
        <AppMain />
        <Footer style={{ textAlign: 'center', padding: 14 }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  };
  return render();
};

export default LayoutApp;
