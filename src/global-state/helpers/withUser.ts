import withStoreState from './withStoreState';

const withUser = withStoreState(store => store.user);

export default withUser;
