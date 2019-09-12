const actors = {
  login:'login',
  logout:'logout'
}
const actions = {
  [actors.login]: ({user:userState},{user}) => ({
    ...userState,
    loggedIn:true,
    hydrated:true,
    activeUser:{
      uid:user.uid,
      color:user.color,
      icon:user.icon,
      image:user.image,
      likes:user.likes,
      permissions:user.permissions,
      username:user.username
    }
  }),
  [actors.logout]: ({user:userState}) => ({
    ...userState,
    loggedIn:false,
    hydrated:true,
    activeUser:{
      uid:null,
      color:"#303f9f",
      icon:'person',
      image:null,
      likes:null,
      permissions:0,
      username:null
    }
  })
}
const defaultUserState = {
  user:{
    hydrated:false,
    loggedIn:false,
    activeUser:{
      uid:null,
      color:"#303f9f",
      icon:'person',
      image:null,
      likes:null,
      permissions:0,
      username:null
    }
  }
}

const selectees = {
  getUser:'getUser',
  getUsername:'getUsername',
  getUid:'getUid',
  getPerms:'getPerms',
  getColor:'getColor'
}
const userSelectors = {
  [selectees.getUser]: state => state.user,
  [selectees.getUsername]: state => state.user.username,
  [selectees.getUid]: state => state.user.uid,
  [selectees.getPerms]: state => state.user.permissions,
  [selectees.getColor]: state => state.user.color
}

export default actions;

export { defaultUserState , userSelectors };
