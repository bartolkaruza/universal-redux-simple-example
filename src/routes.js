import React from 'react';
import {IndexRoute, Route} from 'react-router';
import io from 'socket.io-client';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import App from './containers/App/App';

// TODO: find a better interface for adding to src/client. for now,
// hang socket.io on client here
global.socket = (function initSocket() {
  const socket = io('', {path: '/api/ws', transports: ['polling']});
  socket.on('news', (data) => {
    console.log(data);
  socket.emit('my other event', { my: 'data from client' });
});
  socket.on('msg', (data) => {
    console.log(data);
});

  return socket;
})();

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
      <Route path="/" component={App}>

      </Route>
);
};