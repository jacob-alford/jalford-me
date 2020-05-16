import React, { useMemo, useState } from 'react';
import { useTransition, animated as a } from 'react-spring';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Comment from 'components/words/Comment/Comment';
import NewComment from 'components/words/NewComment/NewComment';
import useCommentAdd from 'components/bindings/postHooks/useCommentAdd';
import useCommentDelete from 'components/bindings/postHooks/useCommentDelete';
import useCommentUpdate from 'components/bindings/postHooks/useCommentUpdate';

import { strctureComments } from './commentStructure';
import { themeHook } from 'theme';
import C from 'theme-constants';
import { userState, postComment, useStoreState, themeState } from 'global-state';

const useClasses = themeHook({
  newCommentHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  beTheFirst: {
    color: (props: { theme: themeState }) => C.textDim(props.theme),
    transition: 'color .5s',
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '1.46rem'
  }
});

const CommentHolder = (props: {
  user: userState;
  fbPath: string;
  comments: postComment[];
}) => {
  const { user, fbPath, comments } = props;
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
  const theme = useStoreState(store => store.theme);
  const classes = useClasses({ theme });

  const permDelete = useCommentDelete(fbPath);
  const updateComment = useCommentUpdate(fbPath);
  const addComment = useCommentAdd(fbPath);

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
            addComment={(body: string) =>
              addComment({
                body,
                depth: currentReply?.depth ?? 0,
                parentId: currentReply?.commentId ?? null,
                user: {
                  image: user.details.image,
                  uid: user.details.uid,
                  username: user.details.username
                }
              })
            }
          />
        </Container>
      </Modal>
      <Container>
        <NewComment
          user={user}
          closeModal={() => setCurrentReply(null)}
          addComment={(body: string) =>
            addComment({
              body,
              depth: 0,
              parentId: null,
              user: {
                image: user.details.image,
                uid: user.details.uid,
                username: user.details.username
              }
            })
          }
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
              updateComment={(body: string, id: string) =>
                updateComment(id, {
                  body
                })
              }
              deleteComment={(id: string) =>
                updateComment(id, {
                  body: '*COMMENT REMOVED*'
                })
              }
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
