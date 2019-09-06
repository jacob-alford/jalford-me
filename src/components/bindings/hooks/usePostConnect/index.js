import { useState , useEffect } from 'react';
import firebase from 'firebase.js';

export default function usePostConnect(id){
  const [isLoading,setIsLoading] = useState(true);
  const [postData,setPostData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if((!error && !postData) || (postData && postData.uid !== id)){
      const db = firebase.firestore();
      const post = db.collection("posts").doc(id);
      const unsubscribe = post.onSnapshot(doc => {
        if(doc.exists){
          setPostData(doc.data());
        }else{
          setError("Post not found!");
        }
      }, error => setError(error));
      return () => unsubscribe;
    }
  },[error,id,postData]);
  useEffect(() => {
    if(isLoading && ((postData && postData.uid === id) || error)) setIsLoading(false);
  },[postData,isLoading,error,id]);
  useEffect(() => {
    if((postData || error) && postData && postData.uid !== id)
      setIsLoading(true);
  },[id,postData,error]);
  return { isLoading , postData , error };
}
