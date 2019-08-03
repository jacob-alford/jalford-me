import { useState , useEffect } from 'react';
import { firebase } from '../../../../index.js';

export default function usePostConnect(id){
  const [isLoading,setIsLoading] = useState(true);
  const [postData,setPostData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if((!error && !postData) || (postData && postData.uid !== id)){
      const db = firebase.firestore();
      const post = db.collection("posts").doc(id);
      const unsubscribe = post.onSnapshot(doc => {
        setPostData(doc.data());
      }, error => setError(error));
      return () => unsubscribe();
    }
  },[error,id,postData]);
  useEffect(() => {
    if(isLoading && (postData || error)) setIsLoading(false);
  },[postData,isLoading,error]);
  return { isLoading , postData , error };
}
