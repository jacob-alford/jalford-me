import { useState , useEffect } from 'react';
import { firebase } from '../../../../index.js';

export default function usePostConnect(id){
  const [isLoading,setIsLoading] = useState(true);
  const [postData,setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const db = firebase.firestore();
    const post = db.collection("posts").doc(id);
    const unsubscribe = post.onSnapshot(doc => {
      if(doc.exists) setPostData(doc.data());
      else setNotFound(true);
    }, error => setError(error));
    return () => unsubscribe();
  },[id]);
  useEffect(() => {
    if(isLoading && (postData || notFound || error)) setIsLoading(false);
  },[postData,isLoading,notFound,error]);
  useEffect(() => {
    if(error || notFound) setPostData(null);
  },[error,notFound]);
  return { isLoading , postData , error , notFound };
}
