const LOG_IN = "LOG_IN";
const setLoggedIn = user => {
  return {
    type:LOG_IN,
    payload:{
      uid:user.uid,
      color:user.color,
      icon:user.icon,
      image:user.image,
      likes:user.likes,
      permissions:user.permissions,
      username:user.username
    }
  }
}

const LOG_OUT = "LOG_OUT";
const setLoggedOut = () => {
  return {
    type:LOG_OUT
  }
}

const LOG_OUT_WITH_WATER = "LOG_OUT_WITH_WATER";
const setLoggedOutWithWater = () => {
  return {
    type:LOG_OUT_WITH_WATER
  }
}

// --- Exported elsewhere as action constructors ---
export { setLoggedIn , setLoggedOut , setLoggedOutWithWater };

// --- Exported to index.js ---
export { LOG_IN , LOG_OUT , LOG_OUT_WITH_WATER };
