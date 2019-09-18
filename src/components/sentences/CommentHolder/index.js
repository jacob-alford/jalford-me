import React , { useMemo } from 'react';

import Container from '@material-ui/core/Container';

import Comment from 'components/words/Comment';
import NewComment from 'components/words/NewComment';

import useNotify from 'components/bindings/hooks/useNotify';
import useComments from 'components/bindings/hooks/useComments';

import { strctureComments } from './commentStructure.js';

import { firebase } from 'firebase.js';

import { getRandomUID } from 'functions';

const createUpdater = (docId,comments,notifyGood,notifyBad) => {
  return (newText,commentId) => {
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
    }).then(notifyGood)
      .catch(notifyBad);
  }
}

const createCommentCreator = config => {
  const {
    docId,
    comments,
    depth,
    parentId,
    notifyGood,
    notifyBad,
    user
  } = config;
  return text => {
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
          user:user
        }
      ]
    }).then(notifyGood)
      .catch(notifyBad);
  }
}

const createDeleter = (docId,comments,notifyGood,notifyBad) => {
  return commentId => {
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
    }).then(notifyGood)
      .catch(notifyBad);
  }
}

const createPermDeleter = (docId,comments,notifyGood,notifyBad) => {
  return commentId => {
    const db = firebase.firestore();
    const docRef = db.collection('postComments').doc(docId);
    const newComments = comments.filter(comment => comment.id !== commentId)
                                .filter(comment => comment.parentId !== commentId);
    docRef.update({
      comments:[
        ...newComments
      ]
    }).then(notifyGood)
      .catch(notifyBad);
  }
}

export default function CommentHolder(props){
  const { user , docId } = props;
  const { comments } = useComments(docId);
  const notify = useNotify({
    timeout:4500
  });
  const mappedComments = useMemo(
    () => strctureComments(comments),[comments]
  );
  return(
    <Container>
      <NewComment
        depth={0}
        docId={docId}
        addComment={createCommentCreator({
          docId,
          comments,
          depth:0,
          parentId:null,
          user:{
            username:user.activeUser.username,
            image:user.activeUser.image,
            uid:user.activeUser.uid
          },
          notifyGood:() => notify({
            alertType:'success',
            body:'Successfully updated comment!'
          }),
          notifyBad:err => notify({
            alertType:'error',
            body:err.toString()
          })
        })}/>
      {mappedComments.map((comment,index) => (
        <Comment
          key={`commentTopLevel${index}`}
          user={comment.user}
          comment={comment}
          docId={docId}
          loggedUser={user}
          addComment={(depth,text,parentId) => createCommentCreator({
            docId,
            comments,
            depth,
            parentId,
            user:{
              username:user.activeUser.username,
              image:user.activeUser.image,
              uid:user.activeUser.uid
            },
            notifyGood:() => notify({
              alertType:'success',
              body:'Successfully updated comment!'
            }),
            notifyBad:err => notify({
              alertType:'error',
              body:err.toString()
            })
          })(text)}
          updateComment={
            createUpdater(
              docId,
              comments,
              () => notify({
                alertType:'success',
                body:'Successfully updated comment!'
              }),
              err => notify({
                alertType:'error',
                body:err.toString()
              })
            )
          }
          deleteComment={
            createDeleter(
              docId,
              comments,
              () => notify({
                alertType:'info',
                body:'Successfully deleted comment'
              }),
              err => notify({
                alertType:'error',
                body:err.toString()
              })
            )
          }
          permDelete={
            createPermDeleter(
              docId,
              comments,
              () => notify({
                alertType:'info',
                body:'Successfully deleted comment'
              }),
              err => notify({
                alertType:'error',
                body:err.toString()
              })
            )
          }/>
      ))}
    </Container>
  )
}
