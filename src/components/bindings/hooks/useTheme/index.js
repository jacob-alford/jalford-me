import { useMemo } from 'react';

import themeConstruct from 'theme';

export default function useTheme(selectors,constructor,dependencies){
  const derivedStyles = useMemo(themeConstruct(
    selectors,constructor
  ),dependencies);
  return derivedStyles;
}
