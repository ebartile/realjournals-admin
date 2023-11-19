import React from 'react';
import { Navigate } from 'react-router-dom';
import router from 'router';
import { isExternalLink } from '..';

export function auth(redirect) {
  return function (next) {
    return function (node, auth) {
      if (!auth.check()) {
        if (isExternalLink(router.generatePath(redirect))) {
          window.location.href = router.generatePath(redirect);
        } else {
          return <Navigate to={router.generatePath(redirect)} replace />;
        }
      }

      return next(node, auth);
    };
  };
}

export function guest(redirect) {
  return function (next) {
    return function (node, auth) {
      if (auth.check()) {
        if (isExternalLink(router.generatePath(redirect))) {
          window.location.href = router.generatePath(redirect);
        } else {
          return <Navigate to={router.generatePath(redirect)} replace />;
        }
      }

      return next(node, auth);
    };
  };
}