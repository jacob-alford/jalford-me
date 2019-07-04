function validateExport(num){
  if(Number.isNaN(num)) return {result:false,error:"Operation results in NaN!"};
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
        tapeMessage = [`${opString}(${displayNum(op(stack[0]))})`,`&#8195;= ${displayNum(op(stack[0]))}`];
      }else{
        tapeMessage = [opString(op(displayNum(stack[0]))),`&#8195;= ${displayNum(op(stack[0]))}`];
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
        tapeMessage = [`${displayNum(stack[0])} ${opString} ${displayNum(stack[1])}`,`&#8195;= ${displayNum(op(stack[0],stack[1]))}`];
      }else{
        tapeMessage = [opString(displayNum(stack[0]),displayNum(stack[1])),`&#8195;= ${displayNum(op(stack[0],stack[1]))}`];
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
      const tapeMessage = [`${reduceMsg}(${displayStackInline(stack)})`,`&#8195;= ${displayNum(stack.reduce(op,0))}`];
      return [[stack.reduce(op,0)],[...tapeMessage,...tape]];
    }else return output.error;
  }
}

function createConstant(num){
  return (stack,tape) => {
    if(stack[0] === 0) {
      const newStack = [...stack];
      newStack.shift();
      return [[num,...newStack],[`ENTER ${num}`,...tape]];
    }
    else return [[num,...stack],[`ENTER ${num}`,...tape]];
  }
}

function createNumType(num){
  return (stack,tape) => {
    if(stack[0].toString().includes("e")){
      const newStack = [0,...stack];
      newStack[0] = Number(newStack[0].toString() + num);
      return [newStack,tape];
    }
    if((Number.isFinite(stack[0]) && !Number.isNaN(stack[0])) || stack[0].toString().includes(".")){
      const newStack = [...stack];
      newStack[0] = Number(newStack[0].toString() + num);
      return [newStack,tape];
    }else{
      const newStack = [...stack];
      newStack[0] = 0;
      newStack[0] = Number(newStack[0].toString() + num);
      return [newStack,tape];
    }
  }
}

function displayNum(num){
  if(Number.isInteger(num)){
    return num;
  }
  return Number(num).toFixed(4);
}

function displayStackInline(stack){
  if(stack.length > 3) return `${stack[0]},${stack[1]},${stack[2]},...`;
  else return stack.toString();
}

const calcFunctions = {};

// --- Create the number buttons ---
for(let i=1;i<10;i++){
  calcFunctions[`type${i}`] = {
    fn:createNumType(i),
    colorClass:"number",
    text:`${i}`,
    minStack:0
  }
}

calcFunctions['type0'] = {
  fn:(stack,tape) => {
    const newStack = [...stack];
    newStack[0] = newStack[0].toString() + "0";
    return [newStack,tape];
  },
  colorClass:"number",
  text:`0`,
  minStack:0
}

calcFunctions["plusMinus"] = {
  fn:(stack,tape) => {
    const newStack = [...stack];
    newStack[0] *= -1;
    return [newStack,tape];
  },
  colorClass:"number",
  text:"&plusmn;",
  minStack:0
}

calcFunctions["dot"] = {
  fn:(stack,tape) => {
    if(stack[0].toString().includes(".")) return "Unable to add a second decimal point!";
    const newStack = [...stack];
    newStack[0] = newStack[0].toString() + ".";
    return [newStack,tape];
  },
  colorClass:"number",
  text:".",
  minStack:0
}

calcFunctions["sin"] = {
  variations:{
    rad:createSingleOperator(num => Math.sin(num),"sin"),
    deg:createSingleOperator(num => Math.sin((Math.PI/180)*num),"sin")
  },
  colorClass:"function",
  text:"sin",
  minStack:1
}
calcFunctions["cos"] = {
  variations:{
    rad:createSingleOperator(num => Math.cos(num),"cos"),
    deg:createSingleOperator(num => Math.cos((Math.PI/180)*num),"cos")
  },
  colorClass:"function",
  text:"cos",
  minStack:1
}
calcFunctions["tan"] = {
  variations:{
    rad:createSingleOperator(num => Math.tan(num),"tan"),
    deg:createSingleOperator(num => Math.tan((Math.PI/180)*num),"tan")
  },
  colorClass:"function",
  text:"tan",
  minStack:1
}
calcFunctions["asin"] = {
  fn:createSingleOperator(num => Math.asin(num),"asin"),
  colorClass:"function",
  text:"sin<sup>-1</sup>",
  minStack:1,
  inputCheck: stack => {
    return {
      valid: stack[0] <= 1 && stack[0] >= -1,
      error: "Inverse sine only defined for ratios less than or equal to one!"
    };
  }
}
calcFunctions["acos"] = {
  fn:createSingleOperator(num => Math.acos(num),"acos"),
  colorClass:"function",
  text:"cos<sup>-1</sup>",
  minStack:1,
  inputCheck: stack => {
    return {
      valid: stack[0] <= 1 && stack[0] >= -1,
      error: "Inverse cosine only defined for ratios less than or equal to one!"
    };
  }
}
calcFunctions["atan"] = {
  fn:createSingleOperator(num => Math.atan(num),"atan"),
  colorClass:"function",
  text:"tan<sup>-1</sup>",
  minStack:1
}

calcFunctions["pi"] = {
  fn:createConstant(Math.PI),
  colorClass:"function",
  text:"&pi;",
  minStack:0
}
calcFunctions["speedOfLight"] = {
  fn:createConstant(299792458),
  colorClass:"function",
  text:"c",
  minStack:0
}

calcFunctions["sum"] = {
  fn:createReducer((a,c) => a+c,"sum"),
  colorClass:"function",
  text:"&Sigma;",
  minStack:0
}
calcFunctions["product"] = {
  fn:createReducer((a,c) => a*c,"product"),
  colorClass:"function",
  text:"&Pi;",
  minStack:0
}
calcFunctions["mean"] = {
  fn:createReducer((a,c,i,arr) => a+(c/arr.length),"mean"),
  colorClass:"function",
  text:"&mu;",
  minStack:1
}

calcFunctions["ln"] = {
  fn:createSingleOperator(num => Math.log(num),"ln"),
  colorClass:"function",
  text:"ln",
  minStack:1,
  inputCheck: stack => {
    return {
      valid: stack[0] > 0,
      error: "Logarithms only defined for nonzero, positive numbers!"
    };
  }
}
calcFunctions["log10"] = {
  fn:createSingleOperator(num => Math.log10(num),"log10"),
  colorClass:"function",
  text:"log<sub>10</sub>",
  minStack:1,
  inputCheck: stack => {
    return {
      valid: stack[0] > 0,
      error: "Logarithms only defined for nonzero, positive numbers!"
    };
  }
}
calcFunctions["log2"] = {
  fn:createSingleOperator(num => Math.log2(num),"log2"),
  colorClass:"function",
  text:"log<sub>2</sub>",
  minStack:1,
  inputCheck: stack => {
    return {
      valid: stack[0] > 0,
      error: "Logarithms only defined for nonzero, positive numbers!"
    };
  }
}
calcFunctions["x2"] = {
  fn:createSingleOperator(num => Math.pow(num,2),num => `${num}^2`),
  colorClass:"function",
  text:"x<sup>2</sup>",
  minStack:1
}
calcFunctions["ex"] = {
  fn:createSingleOperator(num => Math.exp(num),num => `e^${num}`),
  colorClass:"function",
  text:"e<sup>x</sup>",
  minStack:1
}
calcFunctions["twoX"] = {
  fn:createSingleOperator(num => Math.pow(2,num),num => `2^${num}`),
  colorClass:"function",
  text:"2<sup>x</sup>",
  minStack:1
}
calcFunctions["tenX"] = {
  fn:createSingleOperator(num => Math.pow(10,num),num => `10^${num}`),
  colorClass:"function",
  text:"10<sup>x</sup>",
  minStack:1
}
calcFunctions["yx"] = {
  fn:createDoubleOperator((num1,num2) => Math.pow(num1,num2),"^"),
  colorClass:"function",
  text:"y<sup>x</sup>",
  minStack:2
}
calcFunctions["sqrt"] = {
  fn:createSingleOperator(num => Math.sqrt(num),"sqrt"),
  colorClass:"function",
  text:`&radic;<span style="text-decoration:overline;">&nbsp;x&nbsp;</span>`,
  minStack:1,
  inputCheck: stack => {
    return {
      valid: stack[0] >= 0,
      error: "Square root only defined for positive numbers!"
    };
  }
}
calcFunctions["xRtY"] = {
  fn:createDoubleOperator((num1,num2) => Math.pow(num1,1/num2),"&radic;"),
  colorClass:"function",
  text:`<sup>x</sup>&radic;<span style="text-decoration:overline;">&nbsp;y&nbsp;</span>`,
  minStack:2
}
calcFunctions["xinv"] = {
  fn:createSingleOperator(num => 1/num,num => `1/${num}`),
  colorClass:"function",
  text:"x<sup>-1</sup>",
  minStack:1
}
calcFunctions["xfact"] = {
  fn:createSingleOperator(num => {
    function factorial(num){
      if(num > 1) return num * factorial(num - 1);
      else return num;
    }
    return factorial(num);
  },num => `${num}!`),
  colorClass:"function",
  text:"x!",
  minStack:1,
  inputCheck: stack => {
    return {
      valid: stack[0] <= 170,
      error: "Number too big for factorial!"
    };
  }
}

calcFunctions["add"] = {
  fn:createDoubleOperator((num1,num2) => num1 + num2 , "+"),
  colorClass:"action",
  text:"+",
  minStack:2
}
calcFunctions["sub"] = {
  fn:createDoubleOperator((num1,num2) => num2 - num1 , (num1,num2) => `${num2}-${num1}`),
  colorClass:"action",
  text:"-",
  minStack:2
}
calcFunctions["mul"] = {
  fn:createDoubleOperator((num1,num2) => num1 * num2 , "x"),
  colorClass:"action",
  text:"&times;",
  minStack:2
}
calcFunctions["div"] = {
  fn:createDoubleOperator((num1,num2) => num2 / num1 , (num1,num2) => `${num2}/${num1}`),
  colorClass:"action",
  text:"&divide;",
  minStack:2,
  inputCheck: stack => {
    return {
      valid: stack[0] !== 0,
      error: "Unable to divide by zero!"
    };
  }
}
calcFunctions["enter"] = {
  fn:(stack,tape) => {
    const output = validateExport(Number(stack[0]));
    if(output.result){
      const newStack = [0,Number(stack[0]),...stack.slice(1)];
      const newTape = [`ENTER ${displayNum(Number(stack[0]))}`,...tape];
      return [newStack,newTape];
    }else{
      return `Error! Message: ${output.error}`;
    }
  },
  colorClass:"action",
  text:"enter",
  minStack:0
}
calcFunctions["enterCopy"] = {
  fn:(stack,tape) => {
    const output = validateExport(Number(stack[0]));
    if(output.result){
      const newStack = [Number(stack[0]),Number(stack[0]),...stack.slice(1)];
      const newTape = [`ENTER ${displayNum(Number(stack[0]))}`,...tape];
      return [newStack,newTape];
    }else{
      return `Error! Message: ${output.error}`;
    }
  },
  colorClass:"action",
  text:"enter",
  minStack:0
}
calcFunctions["drop"] = {
  fn:(stack,tape) => {
    const newStack = [...stack];
    const droppedValue = newStack.shift();
    if(newStack.length > 0) return [newStack,[`DROP ${droppedValue}`,...tape]];
    else return [[0],[`DROP ${displayNum(droppedValue)}`,...tape]];
  },
  colorClass:"delete",
  text:"drop",
  minStack:0
}
calcFunctions["cancelAll"] = {
  fn:(stack,tape) => {
    return [[0],["CLEAR ALL",...tape]];
  },
  colorClass:"delete",
  text:"AC",
  minStack:0
}
calcFunctions["clear"] = {
  fn:(stack,tape) => {
    const newStack = [...stack];
    newStack.shift();
    return [[0,...newStack],["CLEAR",...tape]];
  },
  colorClass:"delete",
  text:"C",
  minStack:0
}
calcFunctions["backspace"] = {
  fn:(stack,tape) => {
    const newStack = [...stack];
    if(newStack[0].toString().length > 1){
      newStack[0] = newStack[0].toString().slice(0,-1);
      return [newStack,tape];
    }else{
      newStack[0] = 0;
      return [newStack,tape];
    }
  },
  colorClass:"delete",
  text:"&larr;",
  minStack:0
}
calcFunctions["mod"] = {
  fn:createDoubleOperator((num1,num2) => num1%num2 , (num1,num2) => `${num1} mod(${num2})`),
  colorClass:"action",
  text:"mod",
  minStack:2
}
calcFunctions["roll"] = {
  fn:(stack,tape) => {
    const output = validateExport(stack[0]);
    if(output.result){
      const copyStack = [...stack];
      const firstElement = copyStack.shift();
      return [[...copyStack,firstElement],["ROLL",...tape]];
    }else{
      return "Error!";
    }
  },
  colorClass:"action",
  text:"roll",
  minStack:0
}
calcFunctions["swap"] = {
  fn:(stack,tape) => {
    const output = validateExport(stack[0]);
    if(output.result){
      const copyStack = [...stack];
      const firstElement = copyStack.shift();
      const secondElement = copyStack.shift();
      return [[secondElement,firstElement,...copyStack],[`SWAP(${displayNum(firstElement)},${displayNum(secondElement)})`,...tape]];
    }else{
      return "Error!";
    }
  },
  colorClass:"action",
  text:"swap",
  minStack:2
}

export { calcFunctions };
