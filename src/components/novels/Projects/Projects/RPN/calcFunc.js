function validateExport(num){
  if(typeof num !== "number") return {result:false,error:"Operation doesn't result in a number!"};
  if(!Number.isFinite(num)) return {result:false,error:"Operation results in infinity!"};
  return {result:true,error:null};
}

const add = (stack,tape) => {
  const op = (num1,num2) => num1 + num2;
  const output = validateExport(op(stack[0],stack[1]));
  if(output.result){
    const tapeMessage = [`${stack[0]}+${stack[1]}`,`&#8195;=${output}`];
    return [[...tapeMessage,...tape],[output,...stack.slice(2)]];
  }
  else return output.error;
}

const sub = (stack,tape) => {
  const op = (num1,num2) => num1 - num2;
  const output = validateExport(op(stack[0],stack[1]));
  if(output.result){
    const tapeMessage = [`${stack[0]}-${stack[1]}`,`&#8195;=${output}`];
    return [[...tapeMessage,...tape],[output,...stack.slice(2)]];
  }
  else return output.error;
}

const mul = (stack,tape) => {
  const op = (num1,num2) => num1 * num2;
  const output = validateExport(op(stack[0],stack[1]));
  if(output.result){
    const tapeMessage = [`${stack[0]}x${stack[1]}`,`&#8195;=${output}`];
    return [[...tapeMessage,...tape],[output,...stack.slice(2)]];
  }
  else return output.error;
}

const div = (stack,tape) => {
  const op = (num1,num2) => num1 / num2;
  const output = validateExport(op(stack[0],stack[1]));
  if(output.result){
    const tapeMessage = [`${stack[0]}/${stack[1]}`,`&#8195;=${output}`];
    return [[...tapeMessage,...tape],[output,...stack.slice(2)]];
  }
  else return output.error;
}
