import { SettingOutlined } from '@ant-design/icons';
import { Divider, Drawer, theme, Tooltip } from 'antd';
import { memo, useState } from 'react';
import classNames from 'classnames';
import styles from './Setting.module.css';
import { useLocale } from '@/locales';
import type { AppConfigMode } from '@/store/slices/app';
import { setAppSidebarMode } from '@/store/slices/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ThemeSettings from '@/components/molecules/ThemeSettings/ThemeSettings';

const Setting = memo(() => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const sidebarMode = useAppSelector((state) => state.appConfig.sidebarMode);

  const themeToken = theme.useToken();

  const intl = useLocale();

  const sidebarSettings: { label: string; value: AppConfigMode['sidebarMode'] }[] = [
    {
      label: '左侧菜单模式',
      value: 'vertical',
    },
    {
      label: '顶部菜单模式',
      value: 'horizontal',
    },
    {
      label: '混合菜单模式',
      value: 'blend',
    },
  ];

  return (
    <>
      <SettingOutlined onClick={() => setDrawerOpen(true)} />
      <Drawer
        width={300}
        title={intl.formatMessage({ id: 'layout.setting.title' })}
        placement="right"
        bodyStyle={{ padding: 0, height: '100%' }}
        closable={false}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <div
          className="setting"
          style={{
            padding: `0 ${themeToken.token.paddingSM}px`,
            color: themeToken.token.colorText,
          }}
        >
          <Divider>{intl.formatMessage({ id: 'layout.setting.layoutSettings' })}</Divider>
          <div className={styles.sidebarSetting}>
            {sidebarSettings.map((i) => {
              return (
                <Tooltip placement="bottom" title={i.label} key={i.value}>
                  <div
                    className={classNames('cursor', styles.sidebarMode, {
                      'sidebar_mode-select': sidebarMode === i.value,
                    })}
                    style={{
                      border: `2px solid ${themeToken.token.colorPrimary}`,
                    }}
                    onClick={() => {
                      console.time('time');
                      dispatch(setAppSidebarMode(i.value));
                      console.log(i.value, sidebarMode);
                      console.timeEnd('time');
                    }}
                  >
                    <div />
                    <div />
                  </div>
                </Tooltip>
              );
            })}
          </div>
          <Divider>{intl.formatMessage({ id: 'layout.setting.themeSettings' })}</Divider>

          <ThemeSettings />
        </div>
      </Drawer>
    </>
  );
});

export default Setting;
