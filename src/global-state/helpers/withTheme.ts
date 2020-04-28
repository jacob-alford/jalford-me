import withStoreState from './withStoreState';

const withTheme = withStoreState(store => store.theme);

export default withTheme;
