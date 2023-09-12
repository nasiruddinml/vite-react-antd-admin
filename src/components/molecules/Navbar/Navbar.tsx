import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import './Navbar.css';
import Setting from '@/components/molecules/Setting/Setting';
import AppLogo from '@/components/molecules/AppLogo/AppLogo';
import NavSidebar from '@/components/molecules/NavSidebar/NavSidebar';
import { useResponsive } from '@/hooks/useResponsive';
import AppAccount from '@/components/molecules/AppAccount/AppAccount';
import AppLocale from '@/components/molecules/AppLocale/AppLocale';
import AppTheme from '@/components/molecules/AppThemeSwitch/AppThemeSwitch';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppCollapsed } from '@/store/slices/app';

const { Header } = Layout;

const Navbar = memo(() => {
  const dispatch = useAppDispatch();
  const { collapsed, sidebarMode } = useAppSelector(
    (state) => ({
      collapsed: state.appConfig.collapsed,
      sidebarMode: state.appConfig.sidebarMode,
    }),
    shallowEqual,
  );
  const themeToken = theme.useToken();
  const responsive = useResponsive();

  const render = () => {
    return (
      <Header
        className="site-layout-sub-header"
        style={{
          padding: 0,
          backgroundColor: themeToken.token.colorBgContainer,
          borderBottom: `1px solid ${themeToken.token.colorBorder}`,
        }}
      >
        <div className="layout-header">
          {(sidebarMode !== 'blend' || !responsive.sm) && (
            <div className="layout-header-left">
              {(sidebarMode === 'vertical' || !responsive.sm) && (
                <div
                  className="layout-header-collapsed"
                  onClick={() => {
                    dispatch(setAppCollapsed(!collapsed));
                  }}
                >
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
              )}
              {sidebarMode === 'horizontal' && responsive.sm && <AppLogo />}
            </div>
          )}
          <div className="layout-header-conter">
            {sidebarMode !== 'vertical' && responsive.sm ? <NavSidebar /> : <></>}
          </div>

          <div className="layout-header-right">
            <AppTheme />
            <AppLocale />
            <AppAccount />
            <Setting />
          </div>
        </div>
      </Header>
    );
  };

  return render();
});

export default Navbar;
