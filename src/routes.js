import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from './containers/App/App';

export default () => {
  return (
    <Route path="/" component={App}>
    </Route>
  );
};
