import context from 'context';

const Urls = {
  url: 'https://' + context.api + '/v1',
  port: null,
  defaults: {},
  routes: {
    'locale.set': {
      uri: 'locale',
      methods: ['POST']
    },
    'locale.get': {
      uri: 'locale/fetch',
      methods: ['GET']
    },
    'testimonials.get': {
      uri: 'testimonials',
      methods: ['GET']
    },
    'brokers.get': {
      uri: 'brokers',
      methods: ['GET']
    },
    'auth.login': {
      uri: 'auth',
      methods: ['POST']
    },
    'auth.register': {
      uri: 'auth/register',
      methods: ['POST']
    },
    'auth.forgot-password': {
      uri: 'users/password_recovery',
      methods: ['POST']
    },
    'auth.change-password': {
      uri: 'users/change_password_from_recovery',
      methods: ['POST']
    },
    'auth.verify-email': {
      uri: 'users/verify_email',
      methods: ['POST']
    },
    'auth.change-email': {
      uri: 'users/change_email',
      methods: ['POST']
    },
    'auth.cancel-account': {
      uri: 'users/cancel',
      methods: ['POST']
    },
    'auth.logout': {
      uri: 'auth/logout',
      methods: ['POST']
    },
    'accounts.get': {
      uri: 'accounts',
      methods: ['GET', 'HEAD']
    },
    'users.me': {
      uri: 'users/me',
      methods: ['GET', 'HEAD']
    },
    'users.email-verification.send': {
      uri: 'users/send_verification_email',
      methods: ['POST', 'HEAD']
    },
    'users.get-two-factor': {
      uri: 'users/create_totp',
      methods: ['POST', 'HEAD']
    },
    'users.set-two-factor': {
      uri: 'users/verify_totp',
      methods: ['POST', 'HEAD']
    },
    'users.upload-picture': {
      uri: 'users/change_avatar',
      methods: ['POST', 'HEAD']
    },
    'accounts.upload-picture': {
      uri: 'accounts/{id}/change_logo',
      methods: ['POST', 'HEAD'],
      bindings: {
        id: 'id'
      }
    },
    'users.update': {
      uri: 'users/{id}',
      methods: ['PATCH', 'HEAD'],
      bindings: {
        id: 'id'
      }
    },
    'accounts.create': {
      uri: 'accounts',
      methods: ['POST', 'HEAD']
    },
    'admin.user.paginate': {
      uri: 'users',
      methods: ['GET']
    },
    'admin.user.activate': {
      uri: 'users/{id}/activate',
      methods: ['GET'],
      bindings: {
        id: 'id'
      }
    },
    'admin.user.batch-deactivate': {
      uri: 'users/batch_deactivate',
      methods: ['POST']
    },
    'admin.user.batch-activate': {
      uri: 'users/batch_activate',
      methods: ['POST']
    },
    'auth.invite': {
      uri: 'auth/invite',
      methods: ['POST']
    },
    'user.admin-page-list': {
      uri: 'users/{id}/admin-pages',
      methods: ['GET'],
      bindings: {
        id: 'id'
      }
    },
    'user.admin-page-set-dimensions': {
      uri: 'users/{id}/admin-pages',
      methods: ['POST'],
      bindings: {
        id: 'id'
      }
    },
    'accounts.upload-data': {
      uri: 'accounts/{id}/upload_data',
      methods: ['POST'],
      bindings: {
        id: 'id'
      }
    },
    'accounts.upload.attachments': {
      uri: 'accounts/{id}/attachments',
      methods: ['POST'],
      bindings: {
        id: 'id'
      }
    },
    'accounts.upload.attachments.detail': {
      uri: 'accounts/{id}/attachments/{other_id}/',
      methods: ['GET'],
      bindings: {
        id: 'id',
        other_id: 'other_id'
      }
    },
    'accounts.upload.attachments': {
      uri: 'accounts/{id}/attachments',
      methods: ['POST'],
      bindings: {
        id: 'id'
      }
    },
    'admin.theme.set-theme': {
      uri: 'theme',
      methods: ['PUT']
    },
    'admin.system-logs.paginate': {
      uri: 'system-logs',
      methods: ['GET']
    },
    'admin.statistics.system-log': {
      uri: 'system-logs/summary',
      methods: ['GET']
    },
    'admin.settings.get-system-settings': {
      uri: 'system-settings',
      methods: ['GET']
    },
    'admin.system-logs.mark-all-as-seen': {
      uri: 'system-logs/mark_all_as_seen',
      methods: ['POST']
    },
    'admin.system-logs.mark-as-seen': {
      uri: 'system-logs/{log}/mark_as_seen',
      methods: ['POST'],
      bindings: {
        log: 'log'
      }
    },
    'admin.grid.paginate': {
      uri: 'grids',
      methods: ['GET']
    },
    'admin.statistics.total-earnings': {
      uri: 'statistics/total_earnings',
      methods: ['GET']
    },
    'admin.statistics.total-users': {
      uri: 'users/total_users',
      methods: ['GET']
    },
    'admin.statistics.latest-users': {
      uri: 'users/latest_users',
      methods: ['GET']
    },
    'admin.statistics.registration-chart': {
      uri: 'users/registration_chart',
      methods: ['GET']
    }
  }
};

export default Urls;
