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

// --- Exported elsewhere as action constructors ---
export { setLoggedIn , setLoggedOut };

// --- Exported to index.js ---
export { LOG_IN , LOG_OUT };
