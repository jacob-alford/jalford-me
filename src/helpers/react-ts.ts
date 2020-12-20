import React from 'react';

export interface Action<A extends string, B> {
  type: A;
  payload: B;
}

interface RenderProps<Store, Actions, Props> {
  dispatch: (action: Actions) => void;
  store: Store;
  props: Props;
}

const newComponentWithStore = <Props, Store, Actions>(args: {
  init: Store;
  reducer: (store: Store, action: Actions) => Store;
  effects?: (
    renderProps: RenderProps<Store, Actions, Props>
  ) => Array<[() => void | (() => void), Array<any>]>;
  render: (renderProps: RenderProps<Store, Actions, Props>) => JSX.Element;
}) => (props: Props): React.ReactNode => {
  const { reducer: cRed, init, effects = () => [], render } = args;
  const [store, dispatch] = React.useReducer(cRed, init);
  const renderProps: RenderProps<Store, Actions, Props> = {
    dispatch,
    store,
    props
  };
  for (const [effect, dependencies] of effects(renderProps)) {
    React.useEffect(effect, dependencies);
  }
  return render(renderProps);
};

export default newComponentWithStore;
