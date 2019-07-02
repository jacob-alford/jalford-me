import React , { useState , useEffect } from 'react';
import { Grid , Container , Typography } from '@material-ui/core/';

import { StyledRPN } from './style.js';

import rpnImage from '../../../../assets/projects/rpn-header.jpg';

import buttons from './calcFunc.js';

function RPN(props){
  const [display,setDisplay] = useState({tape:[],stack:[]});
  const operate = fn => {
    const [newTape,newStack] = fn(display.stack,display.tape);
    setDisplay({tape:newTape,stack:newStack});
  }
  return (
    <StyledRPN>

    </StyledRPN>
  );
}

export const meta = {
  title:"RPN Calculator",
  featured:true,
  body:"Responsive design calculator, reverse polish notation. Uses keyboard shortcuts!",
  image:rpnImage,
  component:RPN,
  url:"/projects/rpn",
  actions:[
    {type:'contained',color:"secondary",text:"Demo",url:"/projects/rpn"},
    {type:'contained',color:"primary",text:"GitHub",url:"https://github.com/jacob-alford/RPN_Calculator"}
  ]
}
