import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import { storeActions } from '../global-state';
import * as epics from '../epics';
import makeReducer from '../reducer/reducer';

const rootEpic = (action$: any, store$: any, dependencies: any) =>
  combineEpics(...Object.values(epics))(action$, store$, dependencies).pipe(
    catchError((err, source) => {
      console.error(err);
      return source;
    })
  );

const epicMiddleware = createEpicMiddleware();

const globalStore = createStore(
  makeReducer(storeActions),
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default globalStore;
