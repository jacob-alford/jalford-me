import React, { useState, useEffect, useMemo } from 'react';
import { useTransition, animated as a } from 'react-spring';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import Holder from 'components/words/Holder';
import CommentActions from './CommentActions';
import { Link } from './renderers';
import { themeHook } from 'theme';
import unified from 'unified';
import parse from 'remark-parse';
// @ts-ignore
import remark2react from 'remark-react';
import {
  userState,
  structuredComments,
  postComment,
  themeState,
  useStoreState
} from 'global-state';
import C from 'theme-constants';
import 'components/novels/BlogView/markdown.css';

const useClasses = themeHook({
  card: {
    marginTop: '8px',
    flexGrow: 1,
    color: (config: { tldState: themeState }) => C.text(config.tldState),
    background: (config: { tldState: themeState }) => C.contBack(config.tldState),
    transition: 'background .5s, color .5s'
  },
  user: {
    color: (config: { tldState: themeState }) => C.text(config.tldState),
    fontSize: '24px',
    paddingLeft: '8px',
    transition: 'background .5s, color .5s'
  },
  avatar: {
    width: '25px',
    height: '25px'
  },
  bodyHolder: {
    padding: '14px'
  },
  depthMeter: {
    width: '2px',
    minWidth: '2px',
    top: 0,
    bottom: 0,
    marginLeft: '15px',
    marginRight: '15px',
    backgroundColor: 'white'
  },
  holderHolder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: C.spacing(0) + ' !important'
  },
  comment: {
    width: '100%',
    color: (props: { tldState: themeState }) => C.text(props.tldState) + ' !important',
    textAlign: 'left !important',
    transition: 'background .5s, color .5s',
    hr: {
      width: '100%',
      height: '1px',
      transition: 'background .5s',
      background: (props: { tldState: themeState }) =>
        C.div(props.tldState) + ' !important',
      margin: `${C.spacing(0)} 0px ${C.spacing(0)} 0px !important`
    },
    blockquote: {
      color: (props: { tldState: themeState }) =>
        C.textHighlight(props.tldState) + ' !important',
      borderLeft: `0.25rem solid ${(props: { tldState: themeState }) =>
        C.textHighlight(props.tldState)} !important`
    }
  },
  newCommentHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  date: {
    fontSize: '.75rem',
    color: (config: { tldState: themeState }) => C.textDim(config.tldState),
    marginTop: '5px',
    transition: 'background .5s, color .5s'
  },
  button: {
    color: (config: { tldState: themeState }) => C.text(config.tldState),

    transition: 'background .5s, color .5s'
  },
  textEdit: {
    color: (config: { tldState: themeState }) => C.textAlt(config.tldState),
    transition: 'background .5s, color .5s'
  }
});

const isAdmin = (user: userState) => user.details.permissions.value === 10;

const remarkReactComponents = {
  a: Link
};

export default function Comment(props: {
  comment: structuredComments | postComment;
  updateComment: (newText: string, id: string) => void;
  deleteComment: (id: string) => void;
  handleReply: (depth: number, id: string) => void;
  permDelete: (id: string) => void;
  loggedUser: userState;
}) {
  const tldState = useStoreState(store => store.theme);
  const classes = useClasses({ ...props, tldState });
  const {
    comment,
    updateComment,
    deleteComment,
    handleReply,
    permDelete,
    loggedUser
  } = props;
  const { body, depth, user, date, id: commentId } = comment;
  /* This is dumb */
  // @ts-ignore
  const comments = comment.comments || [];
  /* Edit Comment */
  const [bodyText, setBodyText] = useState(body);
  const hidden = body === '*COMMENT REMOVED*';
  useEffect(() => {
    setBodyText(body);
  }, [body]);
  const handleBodyTextChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setBodyText(evt.target.value);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    updateComment(bodyText, commentId);
    setIsEditing(false);
  };
  const handleRevert = () => {
    setBodyText(body);
    setIsEditing(false);
  };
  const handleDelete = () => deleteComment(commentId);
  const handlePermDelete = () => permDelete(commentId);
  const handleDoReply = () => handleReply(depth + 1, commentId);

  const subcommentTrail = useTransition(comments, comment => comment.id, {
    config: {
      mass: 5,
      tension: 2000,
      friction: 200
    },
    initial: {
      transform: 'scale3d(1,1,1)'
    },
    from: {
      transform: 'scale3d(1,0,1)'
    },
    enter: {
      transform: 'scale3d(1,1,1)'
    },
    leave: {
      transform: 'scale3d(1,0,1)'
    }
  });

  const commentDom = useMemo(
    () =>
      (bodyText &&
        unified()
          .use(parse)
          .use(remark2react, { remarkReactComponents })
          //@ts-ignore
          .processSync(bodyText).result) ||
      null,
    [bodyText]
  );

  return (
    <React.Fragment>
      <Container className={classes.holderHolder}>
        {new Array(depth).fill(0).map((_, index) => (
          <div className={classes.depthMeter} key={`depthMeter#${index}`} />
        ))}
        <Card className={classes.card}>
          <CardContent>
            {isAdmin(loggedUser) ? (
              <Holder
                style={{ marginBottom: C.spacing(0) }}
                direction='row'
                justify='space-between'>
                <Holder direction='row' justify='flex-start'>
                  {user.image ? (
                    <Avatar src={user.image} />
                  ) : (
                    <Avatar>{(user.username || 'NA').substring(0, 2)}</Avatar>
                  )}
                  <Typography variant='h3' className={classes.user}>
                    {user.username}
                  </Typography>
                </Holder>
                <Holder>
                  {date ? (
                    <Typography variant='body1' className={classes.date}>
                      {date.toLocaleString('default', {
                        year: 'numeric',
                        month: '2-digit',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                      })}
                    </Typography>
                  ) : null}
                </Holder>
                <Holder direction='row'>
                  <CommentActions
                    loggedUser={loggedUser}
                    user={user}
                    edit={handleEdit}
                    remove={handleDelete}
                    permDelete={handlePermDelete}
                    isEditing={isEditing}
                  />
                </Holder>
              </Holder>
            ) : null}
            {!hidden && isEditing ? (
              <Holder className={classes.bodyHolder}>
                <InputBase
                  value={bodyText}
                  fullWidth
                  multiline
                  className={classes.textEdit}
                  onChange={handleBodyTextChange}
                />
              </Holder>
            ) : (
              <Holder className='markdown-body'>
                <div className={classes.comment}>{commentDom}</div>
              </Holder>
            )}
          </CardContent>
          {!hidden && (
            <CardActions>
              {depth < 6 && !isEditing && loggedUser.loggedIn ? (
                <Button size='small' onClick={handleDoReply} className={classes.button}>
                  Reply
                </Button>
              ) : null}
              {isEditing ? (
                <React.Fragment>
                  <Button size='small' color='primary' onClick={handleSave}>
                    Save
                  </Button>
                  <Button size='small' onClick={handleRevert} className={classes.button}>
                    Cancel
                  </Button>
                </React.Fragment>
              ) : null}
            </CardActions>
          )}
        </Card>
      </Container>
      {subcommentTrail.map(({ item: comment, key, props: newStyles }) => (
        <a.div key={key} style={newStyles}>
          <Comment
            updateComment={updateComment}
            deleteComment={deleteComment}
            permDelete={permDelete}
            loggedUser={loggedUser}
            handleReply={handleReply}
            comment={comment}
            key={comment.id}
          />
        </a.div>
      ))}
    </React.Fragment>
  );
}
