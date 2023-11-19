import lockPassword from '@iconify-icons/ri/lock-password-line';
import loginCircle from '@iconify-icons/ri/login-circle-line';
import lockUnlock from '@iconify-icons/ri/lock-unlock-line';
import userAdd from '@iconify-icons/ri/user-add-line';
import global from '@iconify-icons/ri/global-fill';
import home from '@iconify-icons/ri/home-7-fill';
import context from 'context';

const config = [
  {
    key: 'auth',
    icon: lockPassword,
    external: context.account,
    path: '*',
    name: 'Auth',
    children: [
      {
        key: 'login',
        icon: loginCircle,
        external: context.account,
        path: 'login',
        name: 'Login'
      },
      {
        key: 'forgot-password',
        icon: lockUnlock,
        external: context.account,
        path: 'forgot-password',
        name: 'Forgot Password'
      },
      {
        key: 'register',
        icon: userAdd,
        external: context.account,
        path: 'register',
        name: 'Register'
      },
      {
        key: 'change-password',
        icon: lockUnlock,
        external: context.account,
        path: 'change-password/:token',
        name: 'Change Password'
      },
      {
        key: 'verify-email',
        icon: lockUnlock,
        external: context.account,
        path: 'verify-email/:token',
        name: 'Verify Email'
      },
      {
        key: 'change-email',
        icon: lockUnlock,
        external: context.account,
        path: 'change-email/:token',
        name: 'Change Email'
      },
      {
        key: 'cancel-account',
        icon: lockUnlock,
        external: context.account,
        path: 'cancel-account/:token',
        name: 'Cancel Account'
      }
    ]
  },
  {
    key: 'admin-portal',
    icon: global,
    external: null,
    path: '*',
    name: 'Portal',
    children: [
      {
        key: 'dashboard',
        icon: home,
        external: null,
        path: '/',
        name: 'Dashboard'
      },
      {
        key: 'settings',
        icon: home,
        external: null,
        path: 'settings',
        name: 'Settings'
      },
      {
        key: 'users',
        icon: home,
        external: null,
        path: 'users',
        name: 'Users'
      },
      {
        key: 'modules',
        icon: home,
        external: null,
        path: 'modules',
        name: 'Modules'
      }
    ]
  },
  {
    key: 'terminal-portal',
    icon: global,
    external: context.terminal,
    path: '*',
    name: 'Portal',
    children: [
      {
        key: 'dashboard',
        icon: home,
        external: context.terminal,
        path: '/',
        name: 'Dashboard'
      },
      {
        key: 'profile',
        icon: home,
        external: context.terminal,
        path: 'profile/:name',
        name: 'Profile'
      }
    ]
  },
  {
    key: 'account-portal',
    icon: global,
    external: context.account,
    path: '*',
    name: 'Portal',
    children: [
      {
        key: 'dashboard',
        icon: home,
        external: context.account,
        path: '/',
        name: 'Dashboard'
      }
    ]
  },
  {
    key: 'user-setup',
    icon: global,
    external: context.account,
    path: 'setup/*',
    name: 'User Setup',
    children: [
      {
        key: 'steps',
        icon: home,
        external: context.account,
        path: '/',
        name: 'User Setup'
      }
    ]
  },
  {
    key: 'account-setup',
    icon: global,
    external: context.terminal,
    path: 'setup/*',
    name: 'Account Setup',
    children: [
      {
        key: 'steps',
        icon: home,
        external: context.terminal,
        path: '/',
        name: 'Account Setup'
      }
    ]
  }
];

export default config;
