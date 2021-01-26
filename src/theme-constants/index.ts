import { themeState } from 'global-state';

type getColorFromTheme = (theme: themeState) => string;
type getValueLevel = (index: number) => string;
interface themeConstants {
  prim: getValueLevel;
  acc: getValueLevel;
  bronze: string;
  silver: getColorFromTheme;
  gold: string;
  success: string;
  danger: string;
  warn: string;
  contBackAlt: getColorFromTheme;
  contBack: getColorFromTheme;
  contBackInv: getColorFromTheme;
  text: getColorFromTheme;
  textInv: getColorFromTheme;
  textAlt: getColorFromTheme;
  textDim: getColorFromTheme;
  textHighlight: getColorFromTheme;
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
  bronze: '#cd7f32',
  silver: mkThmSlct('#efefef', '#a7a7a7'),
  gold: '#FFD700',
  success: '#54F780',
  danger: '#F73B41',
  warn: '#FFD952',
  acc: (num: number) => ['#164B6B', '#C70066', '#C74F06'][num],
  contBack: mkThmSlct('#fafafa', '#1f2430'),
  contBackInv: mkThmSlct('#000000', '#ffffff'),
  contBackAlt: mkThmSlct('#ffffff', '#232834'),
  text: mkThmSlct('#000000', '#ffffff'),
  textInv: mkThmSlct('#ffffff', '#000000'),
  textAlt: mkThmSlct('#232323', '#bcbcbc'),
  textDim: mkThmSlct('rgba(0,0,0,.69)', '#cdcdcd'),
  textHighlight: mkThmSlct('#164B6B', '#62F8DE'),
  div: mkThmSlct('#C70066', '#164B6B'),
  action: mkThmSlct('#6171F8', '#14b2c7'),
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
