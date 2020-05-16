import { useReducer } from 'react';
import typeReducer from './_reducer';

export default function useTyper() {
  return useReducer(typeReducer, '');
}
