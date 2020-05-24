import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { GlobalStore } from 'global-state';
import firebase from 'firebase-init';

import App from './App';
import * as serviceWorker from './serviceWorker';

import useFirebase from 'components/bindings/userHooks/useFirebase';

const Root = () => {
  useFirebase();
  return <App />;
};

ReactDOM.render(
  <Provider store={GlobalStore}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();

export { firebase };
