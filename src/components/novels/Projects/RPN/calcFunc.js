function validateExport(num){
  if(typeof num !== "number") return {result:false,error:"Operation doesn't result in a number!"};
  if(!Number.isFinite(num)) return {result:false,error:"Operation results in infinity!"};
  return {result:true,error:null};
}

function createSingleOperator(op,opString){
  return (stack,tape) => {
    const output = validateExport(op(stack[0]));
    if(output.result){
      let tapeMessage;
      if(typeof opString === "string"){
        tapeMessage = [`${opString}(${op(stack[0])})`,`&#8195;=${displayNum(op(stack[0]))}`];
      }else{
        tapeMessage = [opString(op(stack[0])),`&#8195;=${displayNum(op(stack[0]))}`];
      }
      return [[op(stack[0]),...stack.slice(1)],[...tapeMessage,...tape]];
    }
  }
}

function createDoubleOperator(op,opString){
  return (stack,tape) => {
    const output = validateExport(op(stack[0],stack[1]));
    if(output.result){
      let tapeMessage;
      if(typeof opString === "string"){
        tapeMessage = [`${stack[0]}${opString}${stack[1]}`,`&#8195;=${displayNum(op(stack[0],stack[1]))}`];
      }else{
        tapeMessage = [opString(stack[0],stack[1]),`&#8195;=${displayNum(op(stack[0],stack[1]))}`];
      }
      return [[op(stack[0],stack[1]),...stack.slice(2)],[...tapeMessage,...tape]];
    }
    else return output.error;
  }
}

function createReducer(op,reduceMsg){
  return (stack,tape) => {
    const output = validateExport(stack.reduce(op,0));
    if(output.result){
      const tapeMessage = [`${reduceMsg}(${displayStackInline(stack)})`,`&#8195;=${displayNum(stack.reduce(op))}`];
      return [[stack.reduce(op)],[...tapeMessage,...tape]];
    }else return output.error;
  }
}

function createConstant(num){
  return (stack,tape) => {
    return [[num,...stack],[`ENTER ${num}`,...tape]];
  }
}

function displayNum(num){
  return num.toFixed(2);
}

function displayStackInline(stack){
  if(stack.length > 3) return `${stack[0]},${stack[1]},${stack[2]},...`;
  else return stack.toString();
}

const sin = createSingleOperator(num => Math.sin(num),"sin");
const cos = createSingleOperator(num => Math.cos(num),"cos");
const tan = createSingleOperator(num => Math.tan(num),"tan");
const asin = createSingleOperator(num => Math.asin(num),"asin");
const acos = createSingleOperator(num => Math.acos(num),"acos");
const atan = createSingleOperator(num => Math.atan(num),"atan");

const sinInDegMode = createSingleOperator(num => Math.sin((Math.PI/180)*num),"sin");
const cosInDegMode = createSingleOperator(num => Math.cos((Math.PI/180)*num),"sin");
const tanInDegMode = createSingleOperator(num => Math.tan((Math.PI/180)*num),"sin");

const pi = createConstant(Math.PI);
const speedOfLight = createConstant(299792458);

const sum = createReducer((a,c) => a+c,"sum");
const product = createReducer((a,c) => a*c,"product");
const mean = createReducer((a,c,i,arr) => a+(c/arr.length),"mean");

const ln = createSingleOperator(num => Math.log(num),"ln");
const log10 = createSingleOperator(num => Math.log10(num),"log10");
const log2 = createSingleOperator(num => Math.log2(num),"log2");
const x2 = createSingleOperator(num => Math.pow(num,2),num => `${num}^2`);
const ex = createSingleOperator(num => Math.exp(num),num => `e^${num}`);
const twoX = createSingleOperator(num => Math.pow(2,num),num => `2^${num}`);
const tenX = createSingleOperator(num => Math.pow(10,num),num => `10^${num}`);
const yx = createDoubleOperator((num1,num2) => Math.pow(num1,num2),"^");
const sqrt = createSingleOperator(num => Math.sqrt(num),"sqrt");
const xRtY = createDoubleOperator((num1,num2) => Math.pow(num1,1/num2),"&radic;");
const xinv = createSingleOperator(num => 1/num,num => `1/${num}`);
const xfact = createSingleOperator(num => {
  function factorial(num){
    if(num > 1) return num * factorial(num - 1);
    else return num;
  }
  return factorial(num);
},num => `${num}!`);
const add = createDoubleOperator((num1,num2) => num1 + num2 , "+");
const sub = createDoubleOperator((num1,num2) => num1 - num2 , "-");
const mul = createDoubleOperator((num1,num2) => num1 * num2 , "x");
const div = createDoubleOperator((num1,num2) => num1 / num2 , "/");

const enter = (stack,tape,number) => {
  const newStack = [number,...stack];
  const newTape = [`ENTER ${number}`,...tape];
  return [newStack,newTape];
}
const drop = (stack,tape) => {
  const newStack = [...stack];
  const droppedValue = newStack.shift();
  return [newStack,[`DROP ${droppedValue}`,...tape]];
}
const cancelAll = (stack,tape) => {
  return [[],["CLEAR ALL",...tape]];
}
const mod = createDoubleOperator((num1,num2) => num1%num2 , (num1,num2) => `${num1} mod(${num2})`);
const roll = (stack,tape) => {
  const copyStack = [...stack];
  const firstElement = copyStack.shift();
  return [[...copyStack,firstElement],["ROLL",...tape]];
}
const swap = (stack,tape) => {
  const copyStack = [...stack];
  const firstElement = copyStack.shift();
  const secondElement = copyStack.shift();
  return [[secondElement,firstElement,...copyStack],[`SWAP(${firstElement},${secondElement})`,...tape]];
}
