const comboBank = [
  "&alpha;","&beta;","&gamma;",
  "&delta;","&epsilon;","&zeta;",
  "&eta;","&theta;","&iota;",
  "&kappa;","&lambda;","&mu;",
  "&nu;","&xi;","&omicron;",
  "&pi;","&rho;","&sigma;",
  "&tau;","&upsilon;","&phi;",
  "&chi;","&psi;","&omega;"
];
const initialState = [12,20,4];
 // 23 => psi,
 // 15 => omicron,
 // 11 => lamba
const dec = value =>
  (value - 1 >= 0) ?
    value - 1
  : comboBank.length - 1;
const inc = value =>
  (value + 1 < comboBank.length) ?
    value + 1
  : 0;
const operate = (state,indecies,operation) => {
  indecies.forEach(index =>
    state[index] = operation(state[index])
  );
  return state;
}

const actors = {
  leftInc:'leftInc',
  leftDec:'leftDec',
  outerInc:'outerInc',
  outerDec:'outerDec',
  rightInc:'rightInc',
  rightDec:'rightDec'
}
const actions = {
  [actors.leftInc]:state => operate([...state],[0,1],inc),
  [actors.leftDec]:state => operate([...state],[0,1],dec),
  [actors.outerInc]:state => operate([...state],[0,2],inc),
  [actors.outerDec]:state => operate([...state],[0,2],dec),
  [actors.rightInc]:state => operate([...state],[1,2],inc),
  [actors.rightDec]:state => operate([...state],[1,2],dec)
}

const reducer = (state,{index,type}) => {
  try{
    return actions[type](state);
  }catch(err){
    throw new Error(`Unknown reducer of type: ${type}; err: ${err}`);
  }
}

export { reducer , comboBank , initialState };
