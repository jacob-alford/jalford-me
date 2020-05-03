import { globalStore } from '../state-model/_types';

const doNothing = () => (store: globalStore): globalStore => store;

export default doNothing;
