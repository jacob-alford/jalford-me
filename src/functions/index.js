import { navItems } from 'config';

export const getRandomUID = () => Math.random().toString(35).substr(2);

export const getActiveNavItem = path => {
  let returnValue = false;
  if (path === '/') return 0;
  navItems.forEach((item, index) => {
    if (item.url.split('/')[1] === path.split('/')[1]) returnValue = index;
  });
  return returnValue;
};

export const validateEmail = email => {
  const emailArr = email.split('@');
  if (emailArr.length !== 2) return false;
  if (emailArr[0] === '') return false;
  if (emailArr[1] === '') return false;
  // --- Domain Part ---
  const domainPart = emailArr[1];
  if (domainPart[0] === '.') return false;
  if (domainPart.length > 253) return false;
  if (/[^( A-z | 0-9 | -. )]/gi.test(domainPart)) return false;
  const tld = domainPart.split('.')[domainPart.split('.').length - 1];
  if (tld.length < 2) return false;
  // --- User Part ---
  const localPart = emailArr[0];
  if (localPart[0] === '.') return false;
  if (localPart[localPart.length - 1] === '.') return false;
  if (/[.]{2,}/.test(localPart)) return false;
  if (/[^( A-z |0-9 | !#$%&'*+\-/=?^_`{|}~. )]/g.test(localPart)) return false;
  return true;
};

export const validateUsername = username => {
  return username.length > 2;
};

export const randomColor = () => {
  return `#${[
    Math.floor(Math.random() * 255).toString(16),
    Math.floor(Math.random() * 255).toString(16),
    Math.floor(Math.random() * 255).toString(16)
  ].join('')}`;
};

export const getLightness = hex => {
  let wrkHex;
  if (hex.includes('#')) wrkHex = hex.substring(1);
  else wrkHex = hex;
  const wrkArr = [
    Number.parseInt(`${wrkHex[0]}${wrkHex[1]}`, 16) / 255,
    Number.parseInt(`${wrkHex[2]}${wrkHex[3]}`, 16) / 255,
    Number.parseInt(`${wrkHex[4]}${wrkHex[5]}`, 16) / 255
  ].map(color => {
    if (color <= 0.03928) return color / 12.92;
    else return Math.pow((color + 0.055) / 1.055, 2.4);
  });
  const constants = [0.2126, 0.7152, 0.0722];
  return wrkArr.reduce((acc, current, index) => (acc += constants[index] * current), 0);
};

export const getTextColorBasedOnBg = bgHex => {
  const lightness = getLightness(bgHex);
  if (lightness <= 0.179) return '#ffe';
  else return '#332';
};

export const pipe = (...funcArr) => {
  return funcArr.reduce(
    (aggregate, next) => {
      return (...funcs) => aggregate(next(...funcs));
    },
    val => val
  );
};

export const asyncPipe = (firstFunc, ...funcArr) => async (...args) => {
  let mutableState = await firstFunc(...args);
  for (const operator of funcArr) {
    try {
      mutableState = await operator(mutableState);
    } catch (err) {
      console.error(`Error mutation state!  Error: ${err}`);
    }
  }
  return mutableState;
};

export const aggregate = (...funcArr) => (...args) => {
  funcArr.forEach(func => func(...args));
};

export const detectMobile = () => {
  // --- Gotten from the mozillas ---
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) hasTouchScreen = navigator.maxTouchPoints > 0;
  else if ('msMaxTouchPoints' in navigator)
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  else {
    let mQ = window.matchMedia && matchMedia('(pointer:coarse)');
    if (mQ && mQ.media === '(pointer:coarse)') hasTouchScreen = !!mQ.matches;
    else if ('orientation' in window) hasTouchScreen = true;
    // depedicated, but good fallback
    else {
      // Only as a last resort, fall back to user agent sniffing
      var UA = navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
};
