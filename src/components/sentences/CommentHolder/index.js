import React, { useMemo, useState, useCallback } from 'react';

import { useTransition, animated as a } from 'react-spring';

import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import Comment from 'components/words/Comment';
import NewComment from 'components/words/NewComment';

import useNotify from 'components/bindings/hooks/useNotify';
import useComments from 'components/bindings/hooks/useComments';

import { strctureComments } from './commentStructure.js';

import { firebase } from 'firebase.ts';

import { getRandomUID } from 'functions';

import { themeHook } from 'theme';

const useClasses = themeHook({
  newCommentHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  beTheFirst: {
    color: 'rgba(255,255,255,.6)',
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '1.46rem'
  }
});

export default function CommentHolder(props) {
  const { user, docId } = props;
  const { comments, isLoading } = useComments(docId);
  const mappedComments = useMemo(() => strctureComments(comments), [comments]);
  const commentTrail = useTransition(mappedComments, comment => comment.id, {
    config: {
      mass: 5,
      tension: 2000,
      friction: 200
    },
    initial: {
      transform: 'translate3d(0,30px,0) scale3d(1,1,1)',
      opacity: 0
    },
    from: {
      transform: 'translate3d(0,0,0) scale3d(1,0,1)',
      opacity: 0
    },
    enter: {
      transform: 'translate3d(0,0,0) scale3d(1,1,1)',
      opacity: 1
    },
    leave: {
      transform: 'translate3d(0,0,0) scale3d(1,0,1)',
      opacity: 0
    }
  });

  const [currentReply, setCurrentReply] = useState(null);
  const notify = useNotify({
    timeout: 4500
  });
  const classes = useClasses();

  const permDelete = useCallback(
    commentId => {
      const db = firebase.firestore();
      const docRef = db
        .collection('posts')
        .doc(docId)
        .collection('comments')
        .doc(commentId);
      docRef
        .delete()
        .then(() =>
          notify({
            alertType: 'info',
            body: `Successfully deleted comment; Beware: child comments still present in database, but won't appear in UI!`
          })
        )
        .catch(err =>
          notify({
            alertType: 'error',
            body: err.toString()
          })
        );
    },
    [docId, notify]
  );
  const deleteComment = useCallback(
    commentId => {
      const db = firebase.firestore();
      const docRef = db
        .collection('posts')
        .doc(docId)
        .collection('comments')
        .doc(commentId);
      docRef
        .update({
          body: '*This comment has been deleted*',
          deleted: true
        })
        .then(() =>
          notify({
            alertType: 'info',
            body: 'Successfully deleted comment, reload the page to observe the effect.'
          })
        )
        .catch(err =>
          notify({
            alertType: 'error',
            body: err.toString()
          })
        );
    },
    [docId, notify]
  );
  const updateComment = useCallback(
    (newText, commentId) => {
      const db = firebase.firestore();
      const docRef = db
        .collection('posts')
        .doc(docId)
        .collection('comments')
        .doc(commentId);
      docRef
        .update({
          body: newText
        })
        .then(() =>
          notify({
            alertType: 'info',
            body: 'Successfully updated comment.'
          })
        )
        .catch(err =>
          notify({
            alertType: 'error',
            body: err.toString()
          })
        );
    },
    [docId, notify]
  );
  const addComment = useCallback(
    (text, depth, parentId) => {
      const commentId = getRandomUID();
      const db = firebase.firestore();
      const docRef = db
        .collection('posts')
        .doc(docId)
        .collection('comments')
        .doc(commentId);
      docRef
        .set({
          depth,
          parentId,
          body: text,
          id: commentId,
          date: new Date(),
          user: {
            username: user.activeUser.username,
            image: user.activeUser.image,
            uid: user.activeUser.uid
          }
        })
        .then(() =>
          notify({
            alertType: 'success',
            body: 'Successfully created comment!'
          })
        )
        .catch(err =>
          notify({
            alertType: 'error',
            body: err.toString()
          })
        );
    },
    [docId, user, notify]
  );

  return (
    <React.Fragment>
      <Modal
        className={classes.newCommentHolder}
        open={currentReply !== null}
        onClose={() => setCurrentReply(null)}
        aria-labelledby='Comment Reply'
        aria-describedby='Comment Reply'>
        <Container>
          <NewComment
            depth={(currentReply && currentReply.depth) || 0}
            docId={docId}
            closeModal={() => setCurrentReply(null)}
            addComment={text =>
              addComment(text, currentReply.depth, currentReply.commentId)
            }
          />
        </Container>
      </Modal>
      <Container>
        <NewComment
          depth={0}
          docId={docId}
          addComment={text => addComment(text, 0, null)}
        />
        {mappedComments && !isLoading && mappedComments.length === 0 ? (
          <Typography paragraph variant='body2' className={classes.beTheFirst}>
            be the first to comment
          </Typography>
        ) : null}
        {commentTrail.map(({ item: comment, key, props: newStyles }) => (
          <a.div key={key} style={newStyles}>
            <Comment
              user={comment.user}
              comment={comment}
              docId={docId}
              loggedUser={user}
              addComment={addComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              handleReply={(depth, id) =>
                setCurrentReply({
                  depth: depth,
                  commentId: id
                })
              }
              permDelete={permDelete}
            />
          </a.div>
        ))}
      </Container>
    </React.Fragment>
  );
}
