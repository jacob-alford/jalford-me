import { themeState } from 'global-state';

type getColorFromTheme = (theme: themeState) => string;
type getValueLevel = (index: number) => string;
interface themeConstants {
  prim: getValueLevel;
  acc: getValueLevel;
  success: string;
  danger: string;
  contBackAlt: getColorFromTheme;
  contBack: getColorFromTheme;
  text: getColorFromTheme;
  textAlt: getColorFromTheme;
  textDim: getColorFromTheme;
  div: getColorFromTheme;
  action: getColorFromTheme;
  actionHov: getColorFromTheme;
  borderRadius: string;
  shadow: getValueLevel;
  spacing: getValueLevel;
  pagePad: string;
  V: string;
  v: string;
  vm: string;
  vs: string;
  H: string;
  h: string;
  hm: string;
  hs: string;
}

const mkThmSlct = (valLight: string, valDark: string) => (theme: themeState): string =>
  theme === themeState.light ? valLight : valDark;

const C: themeConstants = {
  prim: (num: number) => ['#14b2c7', '#55CBD9', '#62F8DE', '#6171F8'][num],
  success: '#54F780',
  danger: '#F73B41',
  acc: (num: number) => ['#164B6B', '#C70066', '#C74F06'][num],
  contBack: mkThmSlct('#ffffff', '#000000'),
  contBackAlt: mkThmSlct('#cdcdcd', '#232323'),
  text: mkThmSlct('#000000', '#ffffff'),
  textAlt: mkThmSlct('#232323', '#bcbcbc'),
  textDim: mkThmSlct('rgba(0,0,0,.69)', '#cdcdcd'),
  div: mkThmSlct('#C70066', '#164B6B'),
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
      'drop-shadow(12px 12px 20px rgba(0,0,0,.7))'
    ][num],
  spacing: (num: number) =>
    [
      '14px', // 2 * 7
      '33px', // 3 * 11
      '65px', // 5 * 13
      '119px' // 7 * 17
    ][num],
  pagePad: '24px',
  V: '66vh',
  v: '33vh',
  vm: '22vh',
  vs: '11vh',
  H: '66vw',
  h: '33vw',
  hm: '22vw',
  hs: '11vw'
};

export default C;
