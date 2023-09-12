/* eslint-disable react-refresh/only-export-components */
import {
  AppstoreOutlined,
  DatabaseOutlined,
  HomeOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import type { RouteList } from '@/router/route';
import { FormattedMessage } from '@/locales';
import Layout from '@/components/layouts/MainLayouts/MainLayouts';
import Authority from '@/components/molecules/Authenticated/Authenticated';

const Home = lazy(() => import('@/pages/Home/Home'));
const Menu1_1 = lazy(() => import('@/pages/Home/Home'));
const Menu1_2 = lazy(() => import('@/pages/Home/Home'));
const Permissions = lazy(() => import('@/pages/Home/Home'));
const TestPermissionsA = lazy(() => import('@/pages/Home/Home'));
const TestPermissionsB = lazy(() => import('@/pages/Home/Home'));
const DetailsPage = lazy(() => import('@/pages/Home/Home'));
const DetailsInfo = lazy(() => import('@/pages/Home/Home'));
const DetailsParams = lazy(() => import('@/pages/Home/Home'));

export const defaultRoute: RouteList[] = [
  {
    path: '/home',
    id: 'Home',
    element: <Home />,
    meta: { label: FormattedMessage({ id: 'layout.memu.home' }), icon: <HomeOutlined /> },
  },
  {
    path: '/nested',
    id: 'Nested',
    redirect: '/nested/menu1',
    meta: { label: FormattedMessage({ id: 'layout.memu.nesting' }), icon: <AppstoreOutlined /> },
    children: [
      {
        path: 'menu1',
        id: 'Menu1',
        redirect: '/nested/menu1/menu1-1',
        meta: { label: 'menu-1' },
        children: [
          {
            path: 'menu1-1',
            id: 'Menu1-1',
            element: <Menu1_1 />,
            meta: { label: 'menu-1-1' },
          },
          {
            path: 'menu1-2',
            id: 'Menu1-2',
            element: <Menu1_2 />,
            meta: { label: 'menu-1-2' },
          },
        ],
      },
    ],
  },
  {
    path: '/power',
    id: 'Power',
    redirect: '/power/permissions',
    meta: { label: 'admin', icon: <UserSwitchOutlined /> },
    children: [
      {
        path: 'permissions',
        id: 'Permissions',
        element: <Permissions />,
        meta: { label: 'Permission' },
      },
      {
        path: 'test-permissions-a',
        id: 'TestPermissionsA',
        element: <TestPermissionsA />,
        meta: { label: 'Admin permission A' },
      },
      {
        path: 'test-permissions-b',
        id: 'TestPermissionsB',
        element: <TestPermissionsB />,
        meta: { label: 'Test permission B' },
      },
    ],
  },
  {
    path: '/details-page',
    id: 'DetailsPage',
    redirect: '/details-page/index',
    alwaysShow: false,
    meta: { label: 'Details page', whiteList: true },
    children: [
      {
        path: 'index',
        id: 'INDEX',
        element: <DetailsPage />,
        meta: { label: 'index', icon: <DatabaseOutlined /> },
      },
      {
        path: 'details-info',
        id: 'DetailsInfo',
        element: <DetailsInfo />,
        meta: { label: 'Details info', hideSidebar: true },
      },
      {
        path: 'details-params/:id',
        id: 'DetailsParams',
        element: <DetailsParams />,
        meta: { label: 'default params ', hideSidebar: true },
      },
    ],
  },
];

const ErrorPage403 = lazy(() => import('@/components/molecules/403/403'));
const ErrorElement = lazy(() => import('@/components/molecules/ErrorElement/ErrorElement'));
const Refresh = lazy(() => import('@/components/atoms/Refresh/Refresh'));

const Login = lazy(() => import('@/pages/Login/Login'));

export const whiteList = [
  {
    path: '*',
    element: <ErrorPage403 />,
  },
  {
    path: '/refresh/*',
    element: <Refresh />,
    meta: { label: '', hideSidebar: true, whiteList: true },
  },
];

export const baseRouter: RouteObject[] = [
  {
    path: '/',
    element: (
      <Authority>
        <Layout />
      </Authority>
    ),
    errorElement: <ErrorElement pageType="Layout" />,
    children: [...whiteList],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export const browserRouter = createBrowserRouter(baseRouter);
