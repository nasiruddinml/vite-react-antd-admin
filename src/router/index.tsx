import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { baseRouter, whiteList } from './modules';
import { handlePowerRoute, handleRouteList } from './utils';
import type { AsyncRouteType } from '@/store/slices/route';
import { useAppSelector } from '@/store/hooks';

const handleRedirect = (asyncRouter: AsyncRouteType[]) => {
  const routerList = handleRouteList(handlePowerRoute(asyncRouter));
  if (routerList.length) {
    routerList.push({
      path: '',
      element: <Navigate to={routerList[0].path || ''} />,
    });
  }
  return [...routerList, ...whiteList];
};

const mapBaseRouter = (baseRouter: RouteObject[], asyncRouter: AsyncRouteType[]) => {
  return baseRouter.map((i) => {
    const routeItem = i;
    if (routeItem.path === '/') {
      routeItem.children = handleRedirect(asyncRouter);
    }
    return routeItem;
  });
};

const RouteView = memo(() => {
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);
  const [route, setRoute] = useState<RouteObject[]>(mapBaseRouter(baseRouter, asyncRouter));

  useEffect(() => {
    setRoute(mapBaseRouter(baseRouter, asyncRouter));
  }, [asyncRouter]);

  const routeElem = createBrowserRouter(route);

  return <RouterProvider router={routeElem} />;
});

export default RouteView;
