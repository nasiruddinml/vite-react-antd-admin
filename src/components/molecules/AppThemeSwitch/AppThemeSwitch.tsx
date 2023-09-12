import { theme } from 'antd';
import './AppThemeSwitch.css';
import SvgIcon from '@/components/atoms/SvgIcon/SvgIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppThemeMode } from '@/store/slices/app';

const AppTheme = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.appConfig.themeMode);

  const themeToken = theme.useToken();

  return (
    <div
      className={`app-theme cursor ${themeMode === 'dark' && 'app-theme-dark'}`}
      style={{ border: `1px solid ${themeToken.token.colorBorder}` }}
      onClick={() => {
        dispatch(setAppThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
      }}
    >
      <div className="theme-inner" style={{ backgroundColor: themeToken.token.colorBorder }} />
      <SvgIcon name="sun" />
      <SvgIcon name="moon" />
    </div>
  );
};

export default AppTheme;
