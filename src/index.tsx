import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ParallaxProvider } from 'react-scroll-parallax';

import { Provider } from 'global-state';
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
  <Provider>
    <Root />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();

export { firebase };
