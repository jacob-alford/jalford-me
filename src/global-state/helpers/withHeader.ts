import withStoreState from './withStoreState';

const withHeader = withStoreState(state => state.headerIsOpen);

export default withHeader;
