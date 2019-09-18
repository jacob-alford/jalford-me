import themeHook from './themeHook';
const theme = {
  header:{
    link:{
      color:'#5433FF',
      hover:'#A5FECB',
      active:'#fdeff9'
    },
    background:'linear-gradient(to right, #56CCF2, #2F80ED)'
  },
  footer:{
    color:'rgba(255,255,255,.85)',
    background: null
  },
  link:{
    actionable:{
      color:'#33AAFF'
    }
  },
  spacing:{
    cardPadding:'14px',
    gutter:'16px',
    minor:'18px',
    paperPadding:'34px',
    major:'35px',
    significant:'96px'
  },
  text:{
    dark:{
      color:'rgba(0,0,0,.84)'
    },
    light:{
      color:'#ffffff'
    },
    gray:{
      color:'rgba(0,0,0,.69)'
    }
  }
}

const getters = {
  getSpacing: () => theme.spacing,
  getGutter: () => theme.spacing.gutter,
  getMinorSpacing: () => theme.spacing.minor,
  getMajorSpacing: () => theme.spacing.major,
  getBigSpacing: () => theme.spacing.significant,
  getPaperPadding: () => theme.spacing.paperPadding,
  getCardPadding: () => theme.spacing.cardPadding,
  getInlineLink: () => theme.link.actionable,
  getDarkText: () => theme.text.dark.color,
  getLightText: () => theme.text.light.color,
  getGrayText: () => theme.text.gray.color,
  getHeader: () => theme.header,
  getHeaderLink: () => theme.header.link,
  getHeaderBg: () => theme.header.background,
  getFooterColor: () => theme.footer.color,
  getFooterBg: () => theme.footer.background,
  getLinkColor: () => theme.header.link.color,
  getLinkHover: () => theme.header.link.hover,
  getLinkActive: () => theme.header.link.active
}

const themeConstruct = (grabbers,styleCreator) => {
  const mappedGrabbers = grabbers.map(grabber => {
    if(!getters[grabber.type || grabber])
      throw new Error(`Unrecognized theme selector ${grabber.type || grabber}!`);
    else if(grabber.type && grabber.transform)
      return grabber.transform(getters[grabber.type]())
    else return getters[grabber.type || grabber]();
  });
  return styleCreator(mappedGrabbers);
}

const themeSelect = grabbers => {
  return grabbers.map(grabber => {
    if(!getters[grabber.type || grabber])
      throw new Error(`Unrecognized theme selector ${grabber.type || grabber}!`);
    else if(grabber.type && grabber.transform)
      return grabber.transform(getters[grabber.type]())
    else return getters[grabber.type || grabber]();
  });
}

export { themeSelect , themeHook };

export default themeConstruct;
