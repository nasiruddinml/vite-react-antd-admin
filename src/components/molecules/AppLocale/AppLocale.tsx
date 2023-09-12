import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { memo, useMemo } from 'react';
import SvgIcon from '@/components/atoms/SvgIcon/SvgIcon';
import type { LocaleType } from '@/locales';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppLocale } from '@/store/slices/app';

const Locale = memo(() => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.appConfig.locale);

  const menuItems: MenuProps['items'] = useMemo(() => {
    return [
      { label: 'বাংলা', key: 'bn-BD', disabled: locale === 'bn-BD' },
      { label: 'English', key: 'en-US', disabled: locale === 'en-US' },
    ];
  }, [locale]);

  const menuClick: MenuProps['onClick'] = (info) => {
    dispatch(setAppLocale(info.key as LocaleType));
  };

  return (
    <Dropdown
      menu={{ items: menuItems, onClick: menuClick }}
      placement="bottom"
      trigger={['click']}
    >
      <span style={{ fontSize: '1em' }}>
        <SvgIcon name="locales" />
      </span>
    </Dropdown>
  );
});

export default Locale;
