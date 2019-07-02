function validateExport(num){
  if(typeof num !== "number") return {result:false,error:"Operation doesn't result in a number!"};
  if(!Number.isFinite(num)) return {result:false,error:"Operation results in infinity!"};
  return {result:true,error:null};
}

function createSimpleOperator(op,opString){
  return (stack,tape) => {
    const output = validateExport(op(stack[0],stack[1]));
    if(output.result){
      const tapeMessage = [`${stack[0]}${opString}${stack[1]}`,`&#8195;=${displayNum(op(stack[0],stack[1]))}`];
      return [[...tapeMessage,...tape],[op(stack[0],stack[1]),...stack.slice(2)]];
    }
    else return output.error;
  }
}

function displayNum(num){
  return num.toFixed(2);
}

const add = createSimpleOperator((num1,num2) => num1 + num2 , "+");
const sub = createSimpleOperator((num1,num2) => num1 - num2 , "-");
const mul = createSimpleOperator((num1,num2) => num1 * num2 , "x");
const div = createSimpleOperator((num1,num2) => num1 / num2 , "/");
