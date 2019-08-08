import { useState , useEffect } from 'react';
import { firebase } from '../../../../index.js';

import useRHook from '../useRHook';

export default function useRPostConnect(){
  const [isLoading,setIsLoading] = useState(true);
  const [postData,setPostData] = useState(null);
  const [error, setError] = useState(null);
  const { user , userLoading } = useRHook();
  useEffect(() => {
    if(!userLoading){
      if(!user.loggedIn){
        setError("Not logged in!");
      }else if(!error && !postData && user.loggedIn && user.activeUser.permissions.value < 8){
        setError("Insufficient permissions, contact Jacob for a writing role!");
      }else if(!error && !postData && user.loggedIn && user.activeUser.permissions.value >= 8){
        const db = firebase.firestore();
        const posts = db.collection("posts")
                        .where("author","==",user.activeUser.username);
        const unsubscribe =
          posts.onSnapshot(snapshot => {
           const userPosts = [];
           snapshot.forEach(doc => {
             userPosts.push(doc.data());
           });
           setPostData(userPosts);
         }, error => setError(error));
        return () => unsubscribe;
      }
    }
  },[error,postData,user,userLoading]);
  useEffect(() => {
    if(isLoading && !userLoading && (postData || error)) setIsLoading(false);
  },[postData,isLoading,error,userLoading]);
  return { isLoading:isLoading , postData , error , user };
}
