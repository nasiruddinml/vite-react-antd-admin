import type { RouteObject } from 'react-router-dom';
import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';
import type React from 'react';
import { lazy } from 'react';
import { cloneDeep } from 'lodash-es';
import { defaultRoute } from './modules';
import type { MenuItem, RouteList } from '@/router/route';
import type { AsyncRouteType } from '@/store/slices/route';
import { setStoreAsyncRouter } from '@/store/slices/route';
import { store } from '@/store/index';
// eslint-disable-next-line react-refresh/only-export-components
const ErrorElement = lazy(() => import('@/components/molecules/ErrorElement/ErrorElement'));

// import { HomeOutlined } from '@ant-design/icons';

export async function initAsyncRoute(rule: string) {
  // store.dispatch(setStoreAsyncRouter([]));

  const power = [
    {
      path: '/home',
      id: 'Home',
    },
    {
      path: '/nested',
      id: 'Nested',
      children: [
        {
          path: 'menu1',
          id: 'Menu1',
          children: [
            {
              path: 'menu1-1',
              id: 'Menu1-1',
            },
            {
              path: 'menu1-2',
              id: 'Menu1-2',
            },
          ],
        },
      ],
    },
  ];

  const adminRoute = [
    {
      path: '/power',
      id: 'Power',
      children: [
        {
          path: 'permissions',
          id: 'Permissions',
        },
        {
          path: 'test-permissions-a',
          id: 'TestPermissionsA',
        },
      ],
    },
  ];

  const testRoute = [
    {
      path: '/power',
      id: 'Power',
      children: [
        {
          path: 'permissions',
          id: 'Permissions',
        },
        {
          path: 'test-permissions-b',
          id: 'TestPermissionsB',
        },
      ],
    },
  ];

  const getRoute = (name: string) => {
    if (name == 'admin') {
      return {
        data: [...power, ...adminRoute],
        code: 1,
        message: 'ok',
      };
    } else if (name == 'test') {
      return {
        data: [...power, ...testRoute],
        code: 1,
        message: 'ok',
      };
    } else {
      return {
        data: [],
        code: -1,
        message: 'error',
      };
    }
  };

  const res = getRoute(rule);
  if (res.data.length) {
    store.dispatch(setStoreAsyncRouter(res.data as AsyncRouteType[]));
  }
  return '';
}

export function handlePowerRoute(
  dataRouter: AsyncRouteType[],
  routerList: RouteList[] = defaultRoute,
) {
  const newRouteList: RouteList[] = [];
  routerList.forEach((i) => {
    const item = cloneDeep(i);
    if (!item.meta.whiteList) {
      const rItem = dataRouter.find((r) => r.id === item.id);
      if (rItem) {
        if (rItem.children && rItem.children.length && item.children && item.children.length) {
          const children = handlePowerRoute(rItem.children, item.children);
          item.children = children;
          if (children) newRouteList.push(item);
        } else {
          newRouteList.push(item);
        }
      }
    } else {
      newRouteList.push(item);
    }
  });
  return newRouteList;
}

export function handleRouteList(list: RouteList[]): RouteObject[] {
  return list.map((i: RouteList) => {
    const item: RouteObject = {
      path: i.path,
      id: i.id,
      element: i.element,
    };

    if (i.element) {
      item.errorElement = <ErrorElement pageType="Page" />;
    }

    if (i.children) {
      item.children = handleRouteList(i.children);
      if (i.redirect && item.children.length) {
        item.children.push({
          index: true,
          element: <Navigate to={i.redirect} />,
          loader() {
            return redirect(i.redirect || '');
          },
        });
      }
    }

    return item;
  });
}

export function createRouterList(routeList: RouteObject[]) {
  return createBrowserRouter(routeList);
}

export function routeListToMenu(rtList: RouteList[], path?: React.Key): MenuItem[] {
  const menuList: MenuItem[] = [];
  rtList.forEach((i: RouteList) => {
    const item = i;
    if (item.meta.hideSidebar) return;

    if (!item.alwaysShow && item.alwaysShow !== undefined && !item.element) {
      if (item.children && item.children[0]) {
        menuList.push(routeListToMenu([item.children[0]], item.path)[0]);
        return;
      }
    }

    let rtItem: MenuItem = {
      key: item.path,
      label: '',
    };
    if (path) rtItem.key = `${path}/${item.path}`;

    rtItem = { ...rtItem, label: item.meta.label, icon: item.meta.icon };

    if (item.children && !item.element) {
      rtItem.children = routeListToMenu(item.children, rtItem.key);
    }

    menuList.push(rtItem);
  });

  return menuList;
}

export function getParentPaths(routePath: string, routes: MenuItem[]): string[] {
  function dfs(routes: MenuItem[], key: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      if (item.key === key) return [item.key];
      if (!item.children || !item.children.length) continue;
      parents.push(item.key as string);

      if (dfs(item.children, key, parents).length) return parents;
      parents.pop();
    }
    return [];
  }
  return dfs(routes, routePath, []);
}

export function findRouteByPath(path: React.Key, routes: MenuItem[]): MenuItem | null {
  const res = routes.find((item) => item.key == path) || null;
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children instanceof Array && routes[i].children?.length) {
        const miRes = findRouteByPath(path, routes[i].children as MenuItem[]);
        if (miRes) {
          return miRes;
        } else {
          if (routes[i].key == path) return routes[i];
        }
      }
    }
    return null;
  }
}

function pathResolve(...paths: string[]) {
  let resolvePath = '';
  let isAbsolutePath = false;
  for (let i = paths.length - 1; i > -1; i--) {
    const path = paths[i];
    if (isAbsolutePath) {
      break;
    }
    if (!path) {
      continue;
    }
    resolvePath = path + '/' + resolvePath;
    isAbsolutePath = path.charCodeAt(0) === 47;
  }
  if (/^\/+$/.test(resolvePath)) {
    resolvePath = resolvePath.replace(/(\/+)/, '/');
  } else {
    resolvePath = resolvePath
      .replace(/(?!^)\w+\/+\.{2}\//g, '')
      .replace(/(?!^)\.\//g, '')
      .replace(/\/+$/, '');
  }
  return resolvePath;
}

export function setUpRoutePath(routeList: AsyncRouteType[], pathName = '') {
  for (const node of routeList) {
    if (pathName) {
      node.path = pathResolve(pathName, node.path || '');
    }
    if (node.children && node.children.length) {
      setUpRoutePath(node.children, node.path);
    }
  }
  return routeList;
}

export function formatFlatteningRoutes(routesList: AsyncRouteType[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = routesList;
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children || [], hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}
