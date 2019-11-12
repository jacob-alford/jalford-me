const isNightTime = () => {
  const time = (new Date()).getHours();
  return time < 6 || time > 20;
}
const getDefaultThemeState = (light,dark) =>
  (light.matches) ?
    'light'
  : (dark.matches) ?
      'dark'
    : (isNightTime()) ?
        'dark'
      : 'light';

const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const defaultTLDState = {
  themeMode: getDefaultThemeState(prefersLight,prefersDark)
}

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
