import React from 'react';
import Katex from 'components/words/Katex/Katex';
import linkedIn from 'assets/social/LinkedIn.png';
import icecaveImage from 'assets/photos/IceCaves_onHome.webp';
import CrapsIcon from 'assets/acad/modeling-craps-header.jpg';
import C from 'theme-constants';

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
  { text: 'github', url: 'https://github.com/jacob-alford' },
  { text: 'resume', url: 'https://www.visualcv.com/jacob-alford' }
];

export const acadPapers = [
  {
    title: 'Public Network Security',
    description: 'A cryptographic suggestion to abandon WEP',
    url: 'https://www.dropbox.com/s/3wc6pkf4r3m5jga/PublicNetworkSecurity.pdf?dl=0',
    Renderer: () => (
      <Katex
        str={`\\sout{WEP}`}
        inline
        style={{ fontSize: '2rem', margin: C.spacing(0) }}
      />
    )
  },
  {
    title: 'Perceptron Mathematics',
    description: 'A basic look at the mathematics of stochastic gradient descent',
    url: 'https://www.dropbox.com/s/k90ixykryw0ihbb/NMT_ES111_Final_Project.pdf?dl=0',
    Renderer: () => (
      <Katex
        str='\boldsymbol{\nabla} C'
        inline
        style={{ fontSize: '2rem', margin: C.spacing(0) }}
      />
    )
  },
  {
    title: 'Modeling Craps',
    description: 'Analyzing craps bets from a stochastic perspective',
    image: CrapsIcon,
    imageWidth: undefined,
    url: 'https://www.dropbox.com/s/ogmcor4gj8qi2gz/NMT_Math_486_Final_Project.pdf?dl=0'
  },
  {
    title: 'Useful Quaternions',
    description: 'A first look at the fourth-dimension rotational operator',
    url:
      'https://www.dropbox.com/s/gk2gqeritac3iaa/Math411-TermPaper-Quaternions.pdf?dl=0',
    Renderer: () => (
      <Katex
        str={`P' = SPS^{-1}`}
        inline
        style={{ fontSize: '2rem', margin: C.spacing(0) }}
      />
    )
  }
];

export const homePageImage = {
  img: icecaveImage,
  caption: 'The Ice Cave',
  body:
    "A breathtaking diversion in Grants, NM.  It's where I grew up! My family has owned it for generations."
};

export const footerText = 'Copyright © 2020 Jacob Alford';
