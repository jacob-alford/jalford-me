import React , { useMemo , useState , useCallback } from 'react';

import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';

import Comment from 'components/words/Comment';
import NewComment from 'components/words/NewComment';

import useNotify from 'components/bindings/hooks/useNotify';
import useComments from 'components/bindings/hooks/useComments';

import { strctureComments } from './commentStructure.js';

import { firebase } from 'firebase.js';

import { getRandomUID } from 'functions';

import { themeHook } from 'theme';

const getTopMostParentId = (comments,id,topMostParentDepth) => {
  const { depth , id:newId , parentId } = comments.find(comment => comment.id === id);
  if(!depth || depth === topMostParentDepth) return newId;
  else return getTopMostParentId(comments,parentId,topMostParentDepth);
}

const removeParentAndChildren = (comments,topMostParentId) => {
  const topParentDepth = comments.find(comment => comment.id === topMostParentId).depth;
  return comments.filter(comment =>
       comment.id !== topMostParentId
    && comment.parentId !== topMostParentId
    && getTopMostParentId(comments,comment.id,topParentDepth) !== topMostParentId
  );
}

const useClasses = themeHook({
  newCommentHolder:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default function CommentHolder(props){
  const { user , docId } = props;
  const { comments } = useComments(docId);
  const mappedComments = useMemo(
    () => strctureComments(comments),[comments]
  );

  const [currentReply,setCurrentReply] = useState(null);
  const notify = useNotify({
    timeout:4500
  });
  const classes = useClasses();

  const permDelete = useCallback(commentId => {
    const db = firebase.firestore();
    const docRef = db.collection('postComments').doc(docId);
    const newComments = removeParentAndChildren(comments,commentId);
    docRef.update({
      comments:[
        ...newComments
      ]
    }).then(
      () => notify({
        alertType:'info',
        body:'Successfully deleted comment and children'
      })
    ).catch(
      err => notify({
        alertType:'error',
        body:err.toString()
      })
    );
  },[docId,comments,notify]);
  const deleteComment = useCallback(commentId => {
    const db = firebase.firestore();
    const docRef = db.collection('postComments').doc(docId);
    const itemToUpdate = comments.find(comment => comment.id === commentId);
    const newComments = comments.filter(comment => comment.id !== commentId);
    docRef.update({
      comments:[
        ...newComments,
        {
          ...itemToUpdate,
          body:'*This comment has been deleted*'
        }
      ]
    }).then(
      () => notify({
        alertType:'info',
        body:'Successfully deleted comment.'
      })
    ).catch(
      err => notify({
        alertType:'error',
        body:err.toString()
      })
    );
  },[docId,comments,notify]);
  const updateComment = useCallback((newText,commentId) => {
    const db = firebase.firestore();
    const docRef = db.collection('postComments').doc(docId);
    const itemToUpdate = comments.find(comment => comment.id === commentId);
    const newComments = comments.filter(comment => comment.id !== commentId);
    docRef.update({
      comments:[
        ...newComments,
        {
          ...itemToUpdate,
          body:newText
        }
      ]
    }).then(
      () => notify({
        alertType:'info',
        body:'Successfully updated comment.'
      })
    ).catch(
      err => notify({
        alertType:'error',
        body:err.toString()
      })
    );
  },[docId,comments,notify]);
  const addComment = useCallback((text,depth,parentId) => {
    const db = firebase.firestore();
    const docRef = db.collection('postComments').doc(docId);
    docRef.update({
      comments:[
        ...comments,
        {
          body:text,
          depth:depth,
          id:getRandomUID(),
          parentId,
          user:{
            username:user.activeUser.username,
            image:user.activeUser.image,
            uid:user.activeUser.uid
          }
        }
      ]
    }).then(
      () => notify({
        alertType:'success',
        body:'Successfully created comment!'
      })
    ).catch(
      err => notify({
        alertType:'error',
        body:err.toString()
      })
    );
  },[docId,comments,user,notify]);

  return(
    <React.Fragment>
      <Modal
        className={classes.newCommentHolder}
        open={currentReply !== null}
        onClose={() => setCurrentReply(null)}
        aria-labelledby="Comment Reply"
        aria-describedby="Comment Reply">
        <Container>
          <NewComment
            depth={(currentReply && currentReply.depth) || 0}
            docId={docId}
            addComment={text => addComment(text,currentReply.depth,currentReply.commentId)}/>
        </Container>
      </Modal>
      <Container>
        <NewComment
          depth={0}
          docId={docId}
          addComment={text => addComment(text,0,null)}/>
        {mappedComments.map((comment,index) => (
          <Comment
            key={comment.id}
            user={comment.user}
            comment={comment}
            docId={docId}
            loggedUser={user}
            addComment={addComment}
            updateComment={updateComment}
            deleteComment={deleteComment}
            handleReply={(depth,id) => setCurrentReply({
              depth:depth,
              commentId:id
            })}
            permDelete={permDelete}/>
        ))}
      </Container>
    </React.Fragment>
  )
}
