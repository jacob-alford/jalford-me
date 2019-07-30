import { useState , useEffect } from 'react';
import { firebase } from '../../../../index.js';

export default function usePostConnect(id,user){
  const [isLoading,setIsLoading] = useState(true);
  const [hasPermission,setHasPermission] = useState(false);
  const [postData,setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { activeUser } = user;
  useEffect(() => {
    console.log("hasPermissions:" , hasPermission);
    console.log("error:",error);
    if(activeUser.permissions === 10) setHasPermission(true);
    else if(activeUser.permissions >= 8){
      console.log("attempting to validate perms >= 8");
      const db = firebase.firestore();
      const post = db.collection("posts");
      post.where("uid","==",id);
      post.where("owner","==",activeUser.uid);
      post.get().then(doc => {
        if(doc.exists) setHasPermission(true);
      }).catch(error => setError(error));
    }
    if(!hasPermission && !error){
      console.log("attempting to validate perms < 8");
      const db = firebase.firestore();
      const post = db.collection("posts");
      post.where("isPublic","==",true);
      post.where("uid","==",id);
      console.log("post query post",post);
      post.get().then(doc => {
        if(doc.exists) setHasPermission(true);
        else setError("Insufficient permissions.");
      }).catch(error => setError(error));;
    }
  },[id,activeUser,hasPermission,error]);
  useEffect(() => {
    if(hasPermission && !error){
      console.log("Attempting to subscribe!");
      const db = firebase.firestore();
      const post = db.collection("posts").doc(id);
      const unsubscribe = post.onSnapshot(doc => {
        setPostData(doc.data());
      }, error => setError(error));
      return () => unsubscribe();
    }else{
      setNotFound(true);
    }
  },[hasPermission,error,id]);
  useEffect(() => {
    if(isLoading && (postData || notFound || error)) setIsLoading(false);
  },[postData,isLoading,notFound,error]);
  return { isLoading , postData , error , notFound };
}
