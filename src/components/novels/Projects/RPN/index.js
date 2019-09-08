import React , { useState } from 'react';

import * as MUI_COMPONENTS from './mui.js';

import { StyledRPN } from './style.js';

import rpnImage from 'assets/projects/RPN_New.png';
import { calcFunctions } from './calcFunc.js';

import withPageFade from 'components/bindings/wrappers/withPageFade';

const {
  Grid , Typography,
  Table , TableBody, TableCell,
  TableRow, Drawer,
  Hidden, Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Button, IconButton, ButtonBase,
  Reorder
} = MUI_COMPONENTS;

const inputRows = [
  [ "drop" , "clear" , "cancelAll" , "backspace" ],
  [ "roll" , "swap" , "mod" , "div" ],
  [ "type7" , "type8" , "type9" , "mul" ],
  [ "type4" , "type5" , "type6" , "add" ],
  [ "type1" , "type2" , "type3" , "sub" ],
  [ "type0" , "dot" , "plusMinus" , "enter" ]
]
const functionRows = [
  [ "deg/rad" , "pi" , "speedOfLight" , "xinv" ],
  [ "mean" , "sum" , "product" , "xfact" ],
  [ "sin" , "cos" , "tan" , "sqrt" ],
  [ "asin" , "acos" , "atan" , "xRtY" ],
  [ "log10" , "log2" , "ln" , "yx" ],
  [ "tenX" , "twoX" , "ex" , "x2" ]
];

function Row(props){
  const { rowData , operate , degRad , toggleDegRad } = props;
  return rowData.map((button,index) => {
    if(button === "deg/rad"){
      return (
        <ButtonBase
          component={TableCell}
          className="number tableCell"
          key={`cell${index}`}
          onClick={toggleDegRad}>
          <Typography variant="h6">
            {(degRad) ? "Deg" : "Rad"}
          </Typography>
        </ButtonBase>
      );
    }
    if(calcFunctions[button].variations !== undefined){
      if(degRad){
        return (
          <ButtonBase
            component={TableCell}
            className={calcFunctions[button].colorClass + " tableCell"}
            key={`cell${index}`}
            onClick={() => operate(calcFunctions[button].variations.deg,calcFunctions[button].minStack,calcFunctions[button].inputCheck)}>
            <Typography variant="h6" dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
          </ButtonBase>
        );
      }else{
        return (
          <ButtonBase
            component={TableCell}
            className={calcFunctions[button].colorClass + " tableCell"}
            key={`cell${index}`}
            onClick={() => operate(calcFunctions[button].variations.rad,calcFunctions[button].minStack,calcFunctions[button].inputCheck)}>
            <Typography variant="h6" dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
          </ButtonBase>
        );
      }
    }
    return (
      <ButtonBase
        component={TableCell}
        key={`cell${index}`}
        onClick={() => operate(calcFunctions[button].fn,calcFunctions[button].minStack,calcFunctions[button].inputCheck)}
        className={`${calcFunctions[button].colorClass} tableCell`}>
          <Typography variant="h6" dangerouslySetInnerHTML={{__html: calcFunctions[button].text}} />
      </ButtonBase>
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
  const tapeCopy = tape.filter(tapeItem => tapeItem !== "IGNORE");
  for(let i=tapeCopy.length;i<10;i++){
    tapeCopy.push(" ");
  }
  return tapeCopy.map((item,index) => (
    <TableRow key={`tape${index}`} className="tapeRow" style={{height:(drawer) ? "10vh" : null}}>
      <TapeLine text={item} />
    </TableRow>
  ));
}


function RPN(props){
  const [display,setDisplay] = useState({tape:[],stack:[0]});
  const [isDeg,setIsDeg] = useState(true);
  const [tapeDrawerIsOpen,setTapeDrawerIsOpen] = useState(false);
  const [hasAlert, setHasAlert] = useState({status:false,message:""});
  const { headerIsOpen } = props;
  const toggleDegRad = () => {
    setIsDeg(!isDeg);
  }
  const toggleTapeDrawer = () => setTapeDrawerIsOpen(!tapeDrawerIsOpen);
  const throwAlert = message => setHasAlert({status:true,message:message});
  const dismissAlert = () => setHasAlert({status:false,message:""});
  const operate = (fn,minCheck,inputCheck) => {
    if(display.stack.length < minCheck){
      throwAlert("Not enough items in stack for that operation!");
      return;
    }
    if(inputCheck !== undefined){
      const { valid , error } = inputCheck(display.stack);
      if(!valid){
        throwAlert(error);
        return;
      }
    }
    const output = fn(display.stack,display.tape);
    const [newStack,newTape] = output;
    if(typeof output === "string") {
      throwAlert(output);
      return;
    }
    setDisplay({tape:newTape,stack:newStack});
  }
  const handleKeyPress = evt => {
    if(!Number.isNaN(Number(evt.key))){
      operate(calcFunctions[`type${evt.key}`].fn,calcFunctions[`type${evt.key}`].minStack,calcFunctions[`type${evt.key}`].inputCheck);
      evt.preventDefault();
      return;
    }else if(evt.key === "+"){
      operate(calcFunctions[`add`].fn,calcFunctions[`add`].minStack,calcFunctions[`add`].inputCheck);
      evt.preventDefault();
      return;
    }else if(evt.key === "-"){
      operate(calcFunctions[`sub`].fn,calcFunctions[`sub`].minStack,calcFunctions[`sub`].inputCheck);
      evt.preventDefault();
      return;
    }else if(evt.key === "*"){
      operate(calcFunctions[`mul`].fn,calcFunctions[`mul`].minStack,calcFunctions[`mul`].inputCheck);
      evt.preventDefault();
      return;
    }else if(evt.key === "/"){
      operate(calcFunctions[`div`].fn,calcFunctions[`div`].minStack,calcFunctions[`div`].inputCheck);
      evt.preventDefault();
      return;
    }else if(evt.key === "Enter"){
      operate(calcFunctions[`enter`].fn,calcFunctions[`enter`].minStack,calcFunctions[`enter`].inputCheck);
      evt.preventDefault();
      return;
    }else if(evt.key === "."){
      operate(calcFunctions[`dot`].fn,calcFunctions[`dot`].minStack,calcFunctions[`dot`].inputCheck);
      evt.preventDefault();
      return;
    }
  }
  return (
    <StyledRPN headerIsOpen={headerIsOpen} drawerIsOpen={tapeDrawerIsOpen}  tabIndex="0" onKeyPress={handleKeyPress}>
      <Dialog open={hasAlert.status} onClose={dismissAlert}>
        <DialogTitle style={{color:'red'}}>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {hasAlert.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dismissAlert} color="primary">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
      <Hidden lgUp>
        <IconButton onClick={toggleTapeDrawer} style={{color:"#20BDFF"}} className="drawerIcon">
          <Reorder />
        </IconButton>
        <Drawer open={tapeDrawerIsOpen} onClose={toggleTapeDrawer} anchor="left">
          <div style={{width:"25vw",minWidth:"225px"}}>
            <Table className="tapeDisplay">
              <TableBody>
                <Tape tape={display.tape} drawer/>
              </TableBody>
            </Table>
          </div>
        </Drawer>
      </Hidden>
      <Grid container direction="row" className="calcGrid">
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
            <Grid item style={{width:'100%'}}>
              <Grid container direction="row-reverse">
                <Grid item className="calcTable">
                  <Table>
                    <TableBody>
                      {inputRows.map((row,index) => (
                        <TableRow className="calcRow" key={`row${index}`}>
                          <Row rowData={row} operate={operate} degRad={isDeg} toggleDegRad={toggleDegRad}/>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item className="calcTable">
                  <Table>
                    <TableBody>
                      {functionRows.map((row,index) => (
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
        </Grid>
      </Grid>
    </StyledRPN>
  );
}

export default withPageFade(RPN);

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
