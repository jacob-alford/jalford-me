import { useState , useEffect } from 'react';
import { firebase } from 'firebase.js';

export default function useComments(id){
  const [isLoading,setIsLoading] = useState(true);
  const [postData,setPostData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const db = firebase.firestore();
    const postComments = db.collection("postComments").doc(id);
    const unsubscribe = postComments.onSnapshot(doc => {
      if(doc.exists){
        setPostData(doc.data());
      }else{
        setError("Post not found!");
      }
    }, error => setError(error));
    return () => unsubscribe();
  },[id]);
  useEffect(() => {
    if(isLoading && ((postData && postData.uid === id) || error)) setIsLoading(false);
  },[postData,isLoading,error,id]);
  useEffect(() => {
    if((postData || error) && postData && postData.uid !== id)
      setIsLoading(true);
  },[id,postData,error]);
  return {
    isLoading,
    comments:
      (postData && postData.comments) || [],
    error
  };
}
