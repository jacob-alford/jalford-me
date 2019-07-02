import React , { useState , useEffect } from 'react';
import { Grid , Container , Typography,
         Table , TableBody, TableCell,
         TableHead, TableRow, Drawer,
         Hidden } from '@material-ui/core/';

import { StyledRPN } from './style.js';

import rpnImage from '../../../../assets/projects/rpn-header.jpg';
import { calcFunctions } from './calcFunc.js';

import buttons from './calcFunc.js';

const rows = [
  [ "deg/rad" , "pi" , "speedOfLight" , "xinv" , "drop" , "clear" , "cancelAll" , "backspace" ],
  [ "mean" , "sum" , "product" , "xfact" , "roll" , "swap" , "mod" , "div" ],
  [ "sin" , "cos" , "tan" , "sqrt" , "type7" , "type8" , "type9" , "mul" ],
  [ "asin" , "acos" , "atan" , "xRtY" , "type4" , "type5" , "type6" , "add" ],
  [ "log10" , "log2" , "ln" , "yx" , "type1" , "type2" , "type3" , "sub" ],
  [ "tenX" , "twoX" , "ex" , "x2" , "type0" , "dot" , "plusMinus" , "enter" ]
];

function Row(props){
  const { rowData , operate , degRad , toggleDegRad } = props;
  return rowData.map((button,index) => {
    if(button === "deg/rad"){
      return (
        <TableCell
          className="number tableCell"
          key={`cell${index}`}
          onClick={toggleDegRad}>
          {(degRad) ? "Deg" : "Rad"}
        </TableCell>
      );
    }
    if(button.variations !== undefined){
      if(degRad){
        return (
          <TableCell
            className={calcFunctions[button].colorClass + " tableCell"}
            key={`cell${index}`}
            onClick={() => operate(calcFunctions[button].variations.deg,calcFunctions[button].minStack)}>
            <span dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
          </TableCell>
        );
      }else{
        return (
          <TableCell
            className={calcFunctions[button].colorClass + " tableCell"}
            key={`cell${index}`}
            onClick={() => operate(calcFunctions[button].variations.rad,calcFunctions[button].minStack)}>
            <span dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
          </TableCell>
        );
      }
    }
    return (
      <TableCell
        className={calcFunctions[button].colorClass + " tableCell"}
        key={`cell${index}`}
        onClick={() => operate(calcFunctions[button].fn,calcFunctions[button].minStack)}>
        <span dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
      </TableCell>
    );
  });
}

function StackLine(props){
  const { text } = props;
  return(
    <TableCell className="stackLine">
      {text}
    </TableCell>
  );
}


function RPN(props){
  const [display,setDisplay] = useState({tape:[],stack:[0]});
  const [isDeg,setIsDeg] = useState(true);
  const toggleDegRad = () => {
    setIsDeg(!isDeg);
  }
  const operate = (fn,minCheck) => {
    if(display.stack.length < minCheck){
      alert("not enough items!");
      return;
    }
    const output = fn(display.stack,display.tape);
    const [newStack,newTape] = output;
    if(typeof output === "string") {
      alert(output);
      return;
    }
    console.log(newTape,newStack);
    setDisplay({tape:newTape,stack:newStack});
  }

  return (
    <StyledRPN>
      <Grid container className="calcGrid" direction="column">
        <Grid item>
          <Table className="stackDisplay">
            <TableBody>
              {[...display.stack].reverse().map(item => (
                <TableRow>
                  <StackLine text={item} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item>
          <Table className="table">
            <TableBody>
              {rows.map((row,index) => (
                <TableRow key={`row${index}`}>
                  <Row rowData={row} operate={operate} degRad={isDeg} toggleDegRad={toggleDegRad}/>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
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
