import { memo } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Switch, theme } from 'antd';
import styles from './ThemeSettings.module.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppColor } from '@/store/slices/app';
import { useTransformTheme } from '@/hooks/useTransformTheme';

const ThemeSettings = memo(() => {
  const dispatch = useAppDispatch();
  const themeToken = theme.useToken();
  const color = useAppSelector((state) => state.appConfig.color);
  const { themeHtmlClassName } = useTransformTheme();

  const colorList = ['#722ed1', '#eb2f96', '#52c41a', '#13c2c2', '#fadb14', '#fa541c', '#f5222d'];

  return (
    <div className={styles.colorList}>
      <div className="color-list">
        {colorList.map((i) => {
          return (
            <div
              className="cursor color-list-item"
              style={{ backgroundColor: i }}
              key={i}
              onClick={() => {
                dispatch(setAppColor(i));
              }}
            >
              {color === i && <CheckOutlined />}
              {/* <SvgIcon v-if="i === pureColor" class="icon" name="iEL-select" /> */}
            </div>
          );
        })}
      </div>
      <div
        className={styles.options}
        style={{
          marginTop: themeToken.token.margin,
        }}
      >
        <span>Grey Color Mode</span>
        <Switch onChange={(e) => themeHtmlClassName('html-grey', e)} />
      </div>
      <div
        className={styles.options}
        style={{
          marginTop: themeToken.token.margin,
        }}
      >
        <span>Weak Color Mode</span>
        <Switch onChange={(e) => themeHtmlClassName('html-weakness', e)} />
      </div>
    </div>
  );
});

export default ThemeSettings;
