import React , { useState , useEffect } from 'react';
import { Grid , Container , Typography,
         Table , TableBody, TableCell,
         TableHead, TableRow, Drawer,
         Hidden } from '@material-ui/core/';
import { Reorder } from '@material-ui/icons/';
import { StyledRPN } from './style.js';

import rpnImage from '../../../../assets/projects/rpn-header.jpg';
import { calcFunctions } from './calcFunc.js';

import buttons from './calcFunc.js';

import withPageFade from '../../../bindings/wrappers/withPageFade';

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
          <Typography variant="h6">
            {(degRad) ? "Deg" : "Rad"}
          </Typography>
        </TableCell>
      );
    }
    if(calcFunctions[button].variations !== undefined){
      if(degRad){
        return (
          <TableCell
            className={calcFunctions[button].colorClass + " tableCell"}
            key={`cell${index}`}
            onClick={() => operate(calcFunctions[button].variations.deg,calcFunctions[button].minStack,calcFunctions[button].inputCheck)}>
            <Typography variant="h6" dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
          </TableCell>
        );
      }else{
        return (
          <TableCell
            className={calcFunctions[button].colorClass + " tableCell"}
            key={`cell${index}`}
            onClick={() => operate(calcFunctions[button].variations.rad,calcFunctions[button].minStack,calcFunctions[button].inputCheck)}>
            <Typography variant="h6" dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
          </TableCell>
        );
      }
    }
    return (
      <TableCell
        className={calcFunctions[button].colorClass + " tableCell"}
        key={`cell${index}`}
        onClick={() => operate(calcFunctions[button].fn,calcFunctions[button].minStack,calcFunctions[button].inputCheck)}>
        <Typography variant="h6" dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
      </TableCell>
    );
  });
}

function StackLine(props){
  const { text } = props;
  return(
    <TableCell className="stackLine">
      <Typography variant="h4">
        {text}
      </Typography>
    </TableCell>
  );
}

function Stack(props){
  const { stack } = props;
  const renderSlice = stack.slice(0,5);
  for(let i=renderSlice.length;i<5;i++){
    renderSlice.push(" ");
  }
  return renderSlice.map((line,index) => (
    <TableRow key={`stack${index}`} className="stackRow">
      <StackLine text={line} />
    </TableRow>
  )).reverse();
}

function TapeLine(props){
  const { text } = props;
  return (
    <TableCell className="tapeLine">
      <Typography variant="h4" dangerouslySetInnerHTML={{__html: text}} />
    </TableCell>
  );
}

function Tape(props){
  const { tape , drawer } = props;
  const tapeCopy = [...tape];
  for(let i=tapeCopy.length;i<10;i++){
    tapeCopy.push(" ");
  }
  return tapeCopy.splice(0,10).map((item,index) => (
    <TableRow key={`tape${index}`} className="tapeRow" style={{height:(drawer) ? "10vh" : null}}>
      <TapeLine text={item} />
    </TableRow>
  ));
}


function RPN(props){
  const [display,setDisplay] = useState({tape:[],stack:[0]});
  const [isDeg,setIsDeg] = useState(true);
  const [tapeDrawerIsOpen,setTapeDrawerIsOpen] = useState(false);
  const { headerIsOpen } = props;
  const toggleDegRad = () => {
    setIsDeg(!isDeg);
  }
  const toggleTapeDrawer = () => setTapeDrawerIsOpen(!tapeDrawerIsOpen);
  const operate = (fn,minCheck,inputCheck) => {
    if(display.stack.length < minCheck){
      alert("Not enough items in stack for that operation!");
      return;
    }
    if(inputCheck !== undefined){
      const { valid , error } = inputCheck(display.stack);
      if(!valid){
        alert(error);
        return;
      }
    }
    const output = fn(display.stack,display.tape);
    const [newStack,newTape] = output;
    if(typeof output === "string") {
      alert(output);
      return;
    }
    setDisplay({tape:newTape,stack:newStack});
  }
  const handleKeyPress = evt => {
    if(!Number.isNaN(Number(evt.key))){
      operate(calcFunctions[`type${evt.key}`].fn,calcFunctions[`type${evt.key}`].minStack,calcFunctions[`type${evt.key}`].inputCheck);
      evt.preventDefault();
      return;
    }
    if(evt.key === "+"){
      operate(calcFunctions[`add`].fn,calcFunctions[`add`].minStack,calcFunctions[`add`].inputCheck);
      evt.preventDefault();
      return;
    }
    if(evt.key === "-"){
      operate(calcFunctions[`sub`].fn,calcFunctions[`sub`].minStack,calcFunctions[`sub`].inputCheck);
      evt.preventDefault();
      return;
    }
    if(evt.key === "*"){
      operate(calcFunctions[`mul`].fn,calcFunctions[`mul`].minStack,calcFunctions[`mul`].inputCheck);
      evt.preventDefault();
      return;
    }
    if(evt.key === "/"){
      operate(calcFunctions[`div`].fn,calcFunctions[`div`].minStack,calcFunctions[`div`].inputCheck);
      evt.preventDefault();
      return;
    }
    if(evt.key === "Enter"){
      operate(calcFunctions[`enter`].fn,calcFunctions[`enter`].minStack,calcFunctions[`enter`].inputCheck);
      evt.preventDefault();
      return;
    }
  }
  return (
    <StyledRPN headerIsOpen={headerIsOpen} drawerIsOpen={tapeDrawerIsOpen}  tabIndex="0" onKeyPress={handleKeyPress}>
      <Hidden lgUp>
        <div style={{color:"#20BDFF"}} className="drawerIcon" onClick={toggleTapeDrawer}>
          <Reorder />
        </div>
        <Drawer open={tapeDrawerIsOpen} onClose={toggleTapeDrawer} anchor="left">
          <div style={{width:"25vw"}}>
            <Table className="tapeDisplay">
              <TableBody>
                <Tape tape={display.tape} drawer/>
              </TableBody>
            </Table>
          </div>
        </Drawer>
      </Hidden>
      <Grid container direction="row" className="classGrid">
        <Hidden mdDown>
          <Grid item className="tapeHolder">
            <Table className="tapeDisplay">
              <TableBody>
                <Tape tape={display.tape} />
              </TableBody>
            </Table>
          </Grid>
        </Hidden>
        <Grid item className="stackAndButtons">
          <Grid container direction="column">
            <Grid item className="stackHolder">
              <Table className="stackDisplay">
                <TableBody>
                  <Stack stack={display.stack} />
                </TableBody>
              </Table>
            </Grid>
            <Grid item>
              <Table className="calcTable">
                <TableBody>
                  {rows.map((row,index) => (
                    <TableRow className="calcRow" key={`row${index}`}>
                      <Row rowData={row} operate={operate} degRad={isDeg} toggleDegRad={toggleDegRad}/>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
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
  component:withPageFade(RPN),
  url:"/projects/rpn",
  actions:[
    {type:'contained',color:"secondary",text:"Demo",url:"/projects/rpn"},
    {type:'contained',color:"primary",text:"GitHub",url:"https://github.com/jacob-alford/RPN_Calculator"}
  ]
}
