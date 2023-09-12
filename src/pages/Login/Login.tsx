import { Button, Checkbox, Form, Input, theme } from 'antd';
import { memo, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { initAsyncRoute } from '@/router/utils';
import { useAppDispatch } from '@/store/hooks';
import { setUserInfo } from '@/store/slices/userInfo';
import SvgIcon from '@/components/atoms/SvgIcon/SvgIcon';
import AppLocale from '@/components/molecules/AppLocale/AppLocale';
import AppTheme from '@/components/molecules/AppThemeSwitch/AppThemeSwitch';
import './Login.css';

const Login = memo(() => {
  const themeToken = theme.useToken();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // const onLogin = async (): Promise<void> => {
  //   // const res = await getUserInfo(user, pwd);
  //   // if (res.code === 1) {
  //   //   await initAsyncRoute(res.data.power);
  //   //   dispatch(setUserInfo(res.data));
  //     navigate('/home');
  //   // }
  // };

  function genID(length: number) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  }

  const userInfo = {
    name: 'John Due',
    userid: '00000001',
    email: 'johndue@test.com',
    signature: 'my signature',
    introduction: 'John Due Admin',
    title: 'John Due',
    token: '',
    rule: 'admin',
  };

  const userInfo2 = {
    name: 'test',
    userid: '00000002',
    email: '12312311223@qq.com',
    signature: 'test',
    introduction: 'test user',
    title: 'test',
    token: '',
    rule: 'test',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkLogin = (values: any) => {
    const { username, password } = values;
    if (username == 'admin' && password == 'admin123') {
      userInfo.token = genID(16);
      return {
        data: userInfo,
        code: 1,
        message: 'ok',
      };
    } else if (username == 'test' && password == 'test123') {
      userInfo2.token = genID(16);
      return {
        data: userInfo2,
        code: 1,
        message: 'ok',
      };
    } else {
      return {
        data: null,
        code: -1,
        message: 'Wrong code',
      };
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = checkLogin(values) as any;
    console.log(res);
    if (res.code === 1) {
      await initAsyncRoute(res.rule);
      dispatch(setUserInfo(res.data));
      navigate('/home');
    }
  };

  return (
    <div
      className="page-login"
      style={{
        backgroundColor: themeToken.token.colorBgContainer,
        color: themeToken.token.colorText,
      }}
    >
      <div className="container mx-auto">
        {/* <img src="@/assets/login/bg.png" class="wave" /> */}
        <div className="wave">
          <div className="bg" style={{ backgroundColor: themeToken.token.colorBgContainer }} />
          <div className="prospect" style={{ backgroundColor: themeToken.token.colorPrimary }} />
          <div className="prospect-bg" style={{ backgroundColor: themeToken.token.colorPrimary }} />
        </div>
        <div className="img -enter-x" style={{ color: themeToken.token.colorPrimary }}>
          <SvgIcon name="login_Illustration" />
        </div>
        <div className="application">
          <AppLocale />
          <AppTheme />
        </div>
        <div className="login-box">
          <div className="login-form">
            <h2 className="enter-x p-4">My Super admin</h2>
            <div className="enter-x">username: admin password: admin123</div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  autoComplete="on"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
