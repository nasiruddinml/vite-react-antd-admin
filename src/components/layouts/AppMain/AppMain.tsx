import { Layout } from 'antd';
import { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AppMain.module.css';
import Loader from '@/components/atoms/Loader/Loader';

const { Content } = Layout;

const AppMain = memo(() => {
  return (
    <Content className={styles.appMain}>
      <div className={styles.mainContent}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </Content>
  );
});

export default AppMain;
