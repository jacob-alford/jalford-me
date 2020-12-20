import React from 'react';
import newComponentWithStore, { Action } from './react-ts';

type Add = Action<'ADD', number>;
type Subtract = Action<'SUBTRACT', number>;

type Actions = Add | Subtract;

type Store = number;

const reducer = (store: Store, action: Actions): Store => {
  switch (action.type) {
    case 'ADD':
      return store + action.payload;
    case 'SUBTRACT':
      return store - action.payload;
  }
};

const Counter = newComponentWithStore<void, Store, Actions>({
  init: 0,
  reducer,
  render: ({ store, dispatch }) => (
    <div>
      {store}
      <button onClick={() => dispatch({ type: 'ADD', payload: 1 })}>Add 1</button>
      <button onClick={() => dispatch({ type: 'SUBTRACT', payload: 1 })}>Sub 1</button>
    </div>
  )
});

export default Counter;
