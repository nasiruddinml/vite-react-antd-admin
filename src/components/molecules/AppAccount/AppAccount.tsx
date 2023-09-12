import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './AppAccount.module.css';
import avatar from '@/assets/avatar.png';
import { useAppDispatch } from '@/store/hooks';
import { resetStateAction } from '@/store/actions/resetState';

const AppAccount = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const menuChange: MenuProps['onClick'] = (_e) => {
    dispatch(resetStateAction());
    navigate('/login');
  };

  return (
    <div className={styles.appAccount}>
      <div className="cursor">
        <Dropdown
          menu={{
            items,
            onClick: menuChange,
          }}
          placement="bottom"
          arrow
        >
          <img src={avatar} className={styles.wave} />
        </Dropdown>
      </div>
    </div>
  );
};

export default AppAccount;
