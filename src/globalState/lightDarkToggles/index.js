const defaultTLDState = {
  themeMode: 'light'
};

const actors = {
  toggle:'toggle'
}
const actions = {
  [actors.toggle]: ({themeMode}) => (themeMode === 'light') ?
    'dark'
  : (themeMode === 'dark') ?
    'light'
  : 'light'
}

const selectees = {
  getTLD: 'getTLD'
}
const tldSelectors = {
  [selectees.getTLD]: state => state.themeMode
}

export default actions;
export { defaultTLDState , tldSelectors };
