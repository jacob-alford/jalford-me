import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';

import { GlobalStore } from 'global-state';

import App from './App';
import * as serviceWorker from './serviceWorker';

import useFirebase, { firebase } from 'components/bindings/userHooks/useFirebase';

const Root = () => {
  useFirebase();
  return (
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  );
};

ReactDOM.render(
  <Provider store={GlobalStore}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();

export { firebase };
