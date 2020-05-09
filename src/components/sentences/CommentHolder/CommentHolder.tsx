import React, { useMemo, useState } from 'react';

import { useTransition, animated as a } from 'react-spring';

import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import Comment from 'components/words/Comment/Comment';
import NewComment from 'components/words/NewComment/NewComment';

import useNotify from 'components/bindings/hooks/useNotify';

import { strctureComments } from './commentStructure';

import { themeHook } from 'theme';

import { userState, postComment, alertEnum } from 'global-state';

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

const CommentHolder = (props: {
  user: userState;
  path: string;
  comments: postComment[];
}) => {
  const { user, path, comments } = props;
  const isLoading = comments === null;
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

  const [currentReply, setCurrentReply] = useState<{
    depth: number;
    commentId: string;
  } | null>(null);
  const notify = useNotify({
    timeout: 4500
  });
  const classes = useClasses();

  const permDelete = (id: string) => {};
  const deleteComment = (id: string) => {};
  const updateComment = (newText: string, id: string) => {};
  const addComment = () => {};

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
            user={user}
            closeModal={() => setCurrentReply(null)}
            addComment={text => addComment()}
          />
        </Container>
      </Modal>
      <Container>
        <NewComment
          user={user}
          closeModal={() => setCurrentReply(null)}
          addComment={text => addComment()}
        />
        {mappedComments && !isLoading && mappedComments.length === 0 ? (
          <Typography paragraph variant='body2' className={classes.beTheFirst}>
            be the first to comment
          </Typography>
        ) : null}
        {commentTrail.map(({ item: comment, key, props: newStyles }) => (
          <a.div key={key} style={newStyles}>
            <Comment
              comment={comment}
              loggedUser={user}
              addComment={addComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              handleReply={(depth: number, id: string) =>
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
};

export default CommentHolder;
