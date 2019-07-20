import { navItems } from '../config';

export const searchObject = (obj,value) => {
  Object.keys(obj).forEach((key,index) => {
    if(obj[key] === value)
      return index;
  });
  return false;
}

export const searchObjectArray = (arr,key,value) => {
  let returnValue = false;
  arr.forEach((obj,index) => {
    if(obj[key] === value)
      returnValue = index;
  });
  return returnValue;
}

export const getActiveNavItem = path => {
  let returnValue = false;
  if(path === "/") return 0;
  navItems.forEach((item,index) => {
    if(item.url.split("/")[1] === path.split("/")[1])
      returnValue = index;
  });
  return returnValue;
}

export const validateEmail = email => {
  const emailArr = email.split("@");
  if(emailArr.length !== 2) return false;
  if(emailArr[0] === "") return false;
  if(emailArr[1] === "") return false;
  // --- Domain Part ---
  const domainPart = emailArr[1];
  if(domainPart[0] === ".") return false;
  if(domainPart.length > 253) return false;
  if(/[^( A-z | 0-9 | -. )]/gi.test(domainPart)) return false;
  const tld = domainPart.split(".")[domainPart.split(".").length-1];
  if(tld.length < 2) return false;
  // --- User Part ---
  const localPart = emailArr[0];
  if(localPart[0] === ".") return false;
  if(localPart[localPart.length-1] === ".") return false;
  if(/[.]{2,}/.test(localPart)) return false;
  if(/[^( A-z |0-9 | !#$%&'*\+\-\/=?^_`\{\|\}~. )]/g.test(localPart))
    return false;
  return true;
}

export const calculatePasswordEntropy = password => {
  let categories = {
    lowercase:0,
    uppercase:0,
    lowerAndUpper:0,
    numbers:0,
    alphaNumericLower:0,
    alphaNumericUpper:0,
    alphaNumericUpperAndLower:0,
    symbols:0,
    words:0
  };
  // --- Contains some words ---
  if(/([ A-z | 0-9 ]+[-,.;\s])+/g.test(password))
    categories.words = 171000;
  else(/[^( A-z | 0-9 )]/g.test(password))
    categories.symbols = 30;
  // --- No words, but AlPhAnUmErIc+*##&#$% ---
  if(/[A-Z]/g.test(password) && /[a-z]/g.test(password) && /[0-9]/g.test(password))
    categories.alphaNumericUpperAndLower = 62;
  // --- CAPITALSAND1232135 ---
  else if(/[A-Z]/g.test(password) && !/[a-z]/g.test(password) && /[0-9]/g.test(password))
    categories.alphaNumericUpper = 36;
  // --- lowercasessand135236
  else if(!/[A-Z]/g.test(password) && /[a-z]/g.test(password) && /[0-9]/g.test(password))
    categories.alphaNumericLower = 36;
  // --- 12591583475043 ---
  else if(!/[A-Z]/g.test(password) && !/[a-z]/g.test(password) && /[0-9]/g.test(password))
    categories.numbers = 10;
  // --- JustLetters ---
  else if(/[A-Z]/g.test(password) && /[a-z]/g.test(password) && !/[0-9]/g.test(password))
    categories.lowerAndUpper = 26;
  // --- justlowercase ---
  else if(!/[A-Z]/g.test(password) && /[a-z]/g.test(password) && !/[0-9]/g.test(password))
    categories.lowercase = 26;
  // --- JUSTCAPS ---
  else if(/[A-Z]/g.test(password) && !/[a-z]/g.test(password) && !/[0-9]/g.test(password))
    categories.uppercase = 26;

  if(categories.words !== 0){
    const numberOfWords = password.match(/[ A-z | 0-9 ]+/g).length;
    return Math.log2(categories.words) * numberOfWords;
  }else{
    let total = 0;
    for(let [category,value] of Object.entries(categories)){
      total += value;
    }
    return Math.log2(total) * password.length;
  }
}

export const validatePassword = password => {
  if(password.length < 8) return false;
  else if(password.length >= 8 && password.length < 16){
    // --- Password contains some permutation of password ---
    if(/[pP]+[aA@]+[sS5]+[sS5]+[wW]+[oO0]+[rR]+[dD]+/g.test(password)) return false;
    // --- Password is strictly numbers ---
    if(!Number.isNaN(Number(password))) return false;
    const passwordEntropy = calculatePasswordEntropy(password);
    if(passwordEntropy < 50) return false;
    else return true;
  }else{
    // --- Password contains some permutation of password ---
    if(/[pP]+[aA@]+[sS5]+[sS5]+[wW]+[oO0]+[rR]+[dD]+/g.test(password)) return false;
    // --- Password is strictly numbers ---
    if(!Number.isNaN(Number(password))) return false;
    return true;
  }
}

export const validateUsername = password => {
  return true;
}

export const randomColor = () => {
  return `#${[
    Math.floor(Math.random()*255).toString(16),
    Math.floor(Math.random()*255).toString(16),
    Math.floor(Math.random()*255).toString(16)
  ].join("")}`;
}
