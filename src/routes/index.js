import { Suspense, lazy, useContext, useEffect } from 'react';
import LoadingScreen from 'components/LoadingScreen';
import { useAuth } from 'models/Auth';
import { useDispatch } from 'react-redux';
import Middleware from 'components/Middleware';
import { auth as authRule, can, guest as guestRule, requireUserSetup } from 'utils/middleware';
import { notify } from 'utils/index';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import LogoOnlyLayout from 'pages/Portal/layouts/LogoOnlyLayout';
import DashboardLayout from 'pages/Portal/layouts/dashboard';
import context from 'context';
import { useRedirectPath } from 'redirect';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/portal');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

// Status
const Page500 = Loadable(lazy(() => import('../pages/Status/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Status/Page404')));
const Page403 = Loadable(lazy(() => import('../pages/Status/Page403')));

// Dashboard
const DashboardPage = Loadable(lazy(() => import('../pages/Portal/home')));
const SettingsPage = Loadable(lazy(() => import('../pages/Portal/settings')));
const ModulesPage = Loadable(lazy(() => import('../pages/Portal/modules')));
const UsersPage = Loadable(lazy(() => import('../pages/Portal/users')));

export default function Router() {
  const isMaintaince = context.maintaince;
  const isComingSoon = context.comingsoon;
  const { search } = useLocation();
  const { setPath } = useRedirectPath();

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const redirect = queryParams.get('redirect');

    if (redirect) {
      setPath(redirect);
    }
    const data = context.notification;
    notify[data?.type]?.(data.message);
  }, [search]);

  return useRoutes([
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '*',
      element: (
        <Middleware rules={[authRule('auth.login'), requireUserSetup()]}>
          <DashboardLayout />
        </Middleware>
      ),
      children: [
        { path: '', element: <DashboardPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'modules', element: <ModulesPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
