import { useState , useEffect } from 'react';
import { firebase } from 'firebase.js';

export default function useComments(id){
  const [isLoading,setIsLoading] = useState(true);
  const [comments,setComments] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const db = firebase.firestore();
    const postComments = db.collection("postComments").doc(id);
    const unsubscribe = postComments.onSnapshot(doc => {
      if(doc.exists){
        setComments(doc.data());
      }else{
        setError("Post not found!");
      }
    }, error => setError(error));
    return () => unsubscribe();
  },[id]);
  useEffect(() => {
    if(isLoading && (comments || error)) setIsLoading(false);
  },[comments,isLoading,error]);
  return {
    isLoading,
    comments:
      (comments && comments.comments) || [],
    error
  };
}
