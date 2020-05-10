import { themeState } from 'global-state';

type getColorFromTheme = (theme: themeState) => string;
type getValueLevel = (index: number) => string;
interface themeConstants {
  prim: getValueLevel;
  acc: getValueLevel;
  contBack: getColorFromTheme;
  text: getColorFromTheme;
  div: getColorFromTheme;
  action: getColorFromTheme;
  actionHov: getColorFromTheme;
  borderRadius: string;
  shadow: getValueLevel;
  pagePad: string;
  V: string;
  v: string;
  vs: string;
}

const mkThmSlct = (valLight: string, valDark: string) => (theme: themeState): string =>
  theme === themeState.light ? valLight : valDark;

const C: themeConstants = {
  prim: (num: number) => ['#14b2c7', '#55CBD9', '#62F8DE', '#6171F8'][num],
  acc: (num: number) => ['#164B6B', '#C70066', '#C74F06'][num],
  contBack: mkThmSlct('#ffffff', '#000000'),
  text: mkThmSlct('#000000', '#ffffff'),
  div: mkThmSlct('#cdcdcd', '#232323'),
  action: mkThmSlct('#000000', '#ffffff'),
  actionHov: mkThmSlct('#232323', '#cdcdcd'),
  borderRadius: '16px',
  shadow: (num: number) =>
    [
      'drop-shadow(2px 2px 8px rgba(0,0,0,.2))',
      'drop-shadow(4px 4px 9px rgba(0,0,0,.3))',
      'drop-shadow(6px 6px 10px rgba(0,0,0,.4))',
      'drop-shadow(8px 8px 11px rgba(0,0,0,.5))',
      'drop-shadow(10px 10px 11px rgba(0,0,0,.6))',
      'drop-shadow(12px 12px 12px rgba(0,0,0,.7))'
    ][num],
  pagePad: '24px',
  V: '66vh',
  v: '33vh',
  vs: '11vh'
};

export default C;
