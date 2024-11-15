import React, { useCallback } from 'react';
import IdleTimer from 'react-idle-timer';
import { route, useRequest } from 'services/Http';
import { useAuth } from 'models/Auth';
import { notify } from 'utils/index';

const PresenceTimer = () => {
  const [request] = useRequest();
  const auth = useAuth();

  const onIdle = useCallback(() => {
    request.put(route('users.update', { id: auth.user.id }), { presence: 'away' }).catch((error) => {
      if (error.response && error.response.data && error.response.data._error_message) {
        notify.error(error.response.data._error_message);
      }
    });
  }, [request, auth]);

  const onActive = useCallback(() => {
    request.put(route('users.update', { id: auth.user.id }), { presence: 'online' }).catch((error) => {
      if (error.response && error.response.data && error.response.data._error_message) {
        notify.error(error.response.data._error_message);
      }
    });
  }, [request, auth]);

  if (!auth.check()) {
    return null;
  }

  return <IdleTimer onIdle={onIdle} onActive={onActive} timeout={1000 * 60} debounce={250} />;
};

export default PresenceTimer;
