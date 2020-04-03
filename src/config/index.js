import linkedIn from 'assets/social/LinkedIn.png';
import icecaveImage from 'assets/photos/IceCaves_onHome.webp';

export const socialMedia = {
	linkedIn: {
		img: linkedIn,
		url: 'https://www.linkedin.com/in/jacob-alford/'
	},
	email: 'jalford-website@pm.me'
};

export const navItems = [
	{ text: 'home', url: '/' },
	{ text: 'about', url: '/about' },
	{ text: 'rpn', url: '/rpn' },
	{ text: 'websites', url: '/websites' },
	{ text: 'posts', url: '/posts' },
	{ text: 'puzzles', url: '/puzzles' },
	{ text: 'github', url: 'https://github.com/jacob-alford' },
	{ text: 'resume', url: 'https://www.visualcv.com/jacob-alford' }
];

export const homePageImage = {
	img: icecaveImage,
	caption: 'The Ice Cave',
	body:
		"A breathtaking diversion in Grants, NM.  It's where I grew up! My family has owned it for generations."
};

export const footerText = 'Copyright © 2020 Jacob Alford';
