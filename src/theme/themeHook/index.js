import { makeStyles } from '@material-ui/core/styles';

import themeConstruct from 'theme';

export default function themeHook(selectors, applySelectors) {
  if (!applySelectors) return makeStyles(selectors);
  else return makeStyles(themeConstruct(selectors, applySelectors));
}
