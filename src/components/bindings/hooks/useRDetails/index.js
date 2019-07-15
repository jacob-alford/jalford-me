import { useState , useEffect } from 'react';
import firebase from 'firebase';

export default function useRDetails(){
  const [currentUser,setCurrentUser] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if(user)
        setCurrentUser({
          uid:user.uid,
          color:user.color,
          icon:user.icon,
          image:user.image,
          likes:user.likes,
          permissions:user.permissions,
          username:user.username
        });
      else
        setCurrentUser(false);
    });
  },[currentUser]);

  return currentUser;
}
