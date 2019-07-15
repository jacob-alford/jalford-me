const initialState = {
  user:{
    loggedIn:false,
    activeUser:{
      uid:null,
      color:'#11ecfc',
      icon:'person',
      image:null,
      likes:null,
      permissions:0,
      username:null
    }
  }
}

export default initialState;
