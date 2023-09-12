import { ConfigProvider, theme } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import bnBD from 'antd/locale/bn_BD';
import enUS from 'antd/locale/en_US';
import 'antd/dist/reset.css';
import { IntlProvider } from 'react-intl';
import { Suspense, useEffect, useMemo } from 'react';

import { shallowEqual } from 'react-redux';
import { localeConfig, setIntl } from './locales';
import { useAppSelector } from './store/hooks';
import { initAsyncRoute } from './router/utils';
import LayoutSpin from '@/components/atoms/Loader/Loader';
import RouteView from '@/router';

function App() {
  const { locale, color, themeMode } = useAppSelector(
    (state) => ({
      locale: state.appConfig.locale,
      color: state.appConfig.color,
      themeMode: state.appConfig.themeMode,
    }),
    shallowEqual,
  );
  const { userInfo } = useAppSelector((state) => state.userInfo);
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);

  const getLocale = useMemo(() => {
    setIntl(locale);
    if (locale === 'en-US') {
      dayjs.locale('en');
      return enUS;
    } else {
      dayjs.locale('bn-BD');
      return bnBD;
    }
  }, [locale]);

  useEffect(() => {
    if (!asyncRouter.length && userInfo) {
      initAsyncRoute(userInfo.rule);
    }
  }, []);

  const loading = useMemo(() => {
    if (!asyncRouter.length && userInfo) {
      return true;
    }
    return false;
  }, [asyncRouter]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color || '#52c41a',
        },
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      locale={getLocale}
    >
      <IntlProvider locale={locale} messages={localeConfig[locale]}>
        {loading ? (
          <LayoutSpin />
        ) : (
          // <BrowserRouter>
          <Suspense fallback={<LayoutSpin />}>
            <RouteView />
          </Suspense>
          // </BrowserRouter>
        )}
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
