import meImage from '../assets/me/JA_Pro_Square_web.jpg';
import linkedIn from '../assets/social/LinkedIn.png';
import icecaveImage from '../assets/photos/IC_Med_Back_op2_Web-2000-Med.jpg';
import icecaveStore from '../assets/photos/TP_Front_FB-862.jpg';
import { projectList } from '../components/novels/Projects';

export const socialMedia = {
  linkedIn:{
    img:linkedIn,
    url:"https://www.linkedin.com/in/jacob-alford/"
  },
  email:"jalford-website@pm.me"
}

export { projectList };

export const navItems = [
  {text:"Home",url:"/"},
  {text:"About/Contact",url:"/about"},
  {text:"Projects",url:"/projects"},
  {text:"Blog",url:"/blog"},
  {text:"GitHub",url:"https://github.com/jacob-alford"},
  {text:"Resume",url:"https://www.visualcv.com/jacob-alford"}
];

export {meImage as aboutContactImage};

const homePageImageArray = [
  {img:icecaveImage,caption:"The Ice Cave",body:"A breathtaking diversion in Grants, NM.  It's where I grew up! My family has owned it for generations."},
  {img:icecaveStore,caption:"The Trading Post",body:"An olde time store."}
];

export const homePageImage = homePageImageArray[0];

export const footerText = "Copyright © 2019 Jacob Alford";

export const blogCategories = [
  "Philosophy","Movies","Stories"
];
export const blogSearchBy = [
  "Tags" , "Name" , "Date"
];
