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
