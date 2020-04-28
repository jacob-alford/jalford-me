import withStoreState from './withStoreState';

const withNotifications = withStoreState(store => store.notifications);

export default withNotifications;
