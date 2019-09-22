import React , { useMemo , useState , useCallback } from 'react';

import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import Comment from 'components/words/Comment';
import NewComment from 'components/words/NewComment';

import useNotify from 'components/bindings/hooks/useNotify';
import useComments from 'components/bindings/hooks/useComments';

import { strctureComments } from './commentStructure.js';

import { firebase } from 'firebase.js';

import { getRandomUID } from 'functions';

import { themeHook } from 'theme';

const useClasses = themeHook({
  newCommentHolder:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  beTheFirst:{
    color:'rgba(255,255,255,.6)',
    marginTop:'16px',
    textAlign:'center',
    fontSize:'1.46rem'
  }
});

export default function CommentHolder(props){
  const { user , docId } = props;
  const { comments , isLoading } = useComments(docId);
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
    const docRef = db.collection('posts').doc(docId);
    docRef.update({
      [`comments.${commentId}`]:null
    }).then(
      () => notify({
        alertType:'info',
        body:'Successfully deleted comment; Beware: child comments still present in database.'
      })
    ).catch(
      err => notify({
        alertType:'error',
        body:err.toString()
      })
    );
  },[docId,notify]);
  const deleteComment = useCallback(commentId => {
    const db = firebase.firestore();
    const docRef = db.collection('posts').doc(docId);
    docRef.update({
      [`comments.${commentId}.body`]:'*This comment has been deleted*',
      [`comments.${commentId}.deleted`]:true
    }).then(
      () => notify({
        alertType:'info',
        body:'Successfully deleted comment, reload the page to observe the effect.'
      })
    ).catch(
      err => notify({
        alertType:'error',
        body:err.toString()
      })
    );
  },[docId,notify]);
  const updateComment = useCallback((newText,commentId) => {
    const db = firebase.firestore();
    const docRef = db.collection('posts').doc(docId);
    docRef.update({
      [`comments.${commentId}.body`]:newText
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
  },[docId,notify]);
  const addComment = useCallback((text,depth,parentId) => {
    const db = firebase.firestore();
    const docRef = db.collection('posts').doc(docId);
    const commentID = getRandomUID();
    docRef.update({
      [`comments.${commentID}`]:{
        depth,
        parentId,
        body:text,
        id:commentID,
        date:new Date(),
        user:{
          username:user.activeUser.username,
          image:user.activeUser.image,
          uid:user.activeUser.uid
        }
      }

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
  },[docId,user,notify]);

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
        {(mappedComments && !isLoading && mappedComments.length === 0) ? (
          <Typography paragraph variant="body2" className={classes.beTheFirst}>
            be the first to comment
          </Typography>
        ) : null}
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
