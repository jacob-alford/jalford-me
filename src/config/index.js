import meImage from 'assets/me/profile_pic.webp';
import linkedIn from 'assets/social/LinkedIn.png';
import icecaveImage from 'assets/photos/IceCaves_onHome.webp';
import icecaveStore from 'assets/photos/TP_Front_FB-862.jpg';
import { projectList } from 'components/novels/Projects';

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
  {text:"Websites",url:"/websites"},
  {text:"Posts",url:"/posts"},
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
