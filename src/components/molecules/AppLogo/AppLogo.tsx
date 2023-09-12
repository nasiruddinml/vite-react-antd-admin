import { memo } from 'react';
import { Image, theme } from 'antd';
import styles from './AppLogo.module.css';
import logo from '@/assets/logo.png';

const AppLogo = memo(() => {
  const themeToken = theme.useToken();

  return (
    <div className={styles.appLogo}>
      <div className="logo">
        <Image width={38} src={logo} preview={false} />
      </div>
      <div className="name" style={{ color: themeToken.token.colorText }}>
        Admin
      </div>
    </div>
  );
});

export default AppLogo;
