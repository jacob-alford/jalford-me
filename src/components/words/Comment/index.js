import React, { useState } from 'react';
import Markdown from 'react-markdown';

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
import CommentActions from './CommentActions.js';

import markdownConfig from 'helpers/blogParse.js';
import { katexMarkdown } from 'helpers/blogParse.js';

import useTLD from 'components/bindings/hooks/useTLD';

import { themeHook } from 'theme';

const useClasses = themeHook(['getGrayText', 'getDarkText'], ([grayText, darkText]) => ({
  card: {
    marginTop: '8px',
    flexGrow: 1,
    color: ({ tldState }) =>
      tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
    background: ({ tldState }) => (tldState === 'light' ? '#fff' : '#232323')
  },
  user: {
    color: ({ tldState }) =>
      tldState === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)',
    fontSize: '24px',
    paddingLeft: '8px'
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
    alignItems: 'stretch'
  },
  commyMarkdown: {
    width: '100%'
  },
  newCommentHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  date: {
    fontSize: '.75rem',
    color: ({ tldState }) =>
      tldState === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,.85)',
    marginTop: '5px'
  },
  button: {
    color: ({ tldState }) =>
      tldState === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,.85)'
  },
  textEdit: {
    color: ({ tldState }) =>
      tldState === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,.85)'
  }
}));

const isAdmin = user => user.details.permissions.value === 10;

export default function Comment(props) {
  const [tldState] = useTLD();
  const classes = useClasses({ ...props, tldState });
  const {
    comment: { body, depth, comments, user, date, deleted, id: commentId },
    docId,
    updateComment,
    deleteComment,
    handleReply,
    permDelete,
    addComment,
    loggedUser
  } = props;
  /* Edit Comment */
  const [bodyText, setBodyText] = useState(body);
  const handleBodyTextChange = evt => setBodyText(evt.target.value);
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

  const subcommentTrail = useTransition(comments || [], comment => comment.id, {
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

  return (
    <React.Fragment>
      <Container className={classes.holderHolder}>
        {new Array(depth).fill(0).map((_, index) => (
          <div className={classes.depthMeter} key={`depthMeter#${index}`} />
        ))}
        <Card className={classes.card}>
          <CardContent>
            {!deleted || isAdmin(loggedUser) ? (
              <Holder direction='row' justify='space-between'>
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
                      {date.toDate().toLocaleString('default', {
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
                    details={loggedUser.details}
                    commentUser={user}
                    edit={handleEdit}
                    remove={handleDelete}
                    permDelete={handlePermDelete}
                    isEditing={isEditing}
                  />
                </Holder>
              </Holder>
            ) : null}
            {isEditing ? (
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
              <Holder className={classes.bodyHolder}>
                <Markdown
                  className={classes.commyMarkdown}
                  renderers={markdownConfig}
                  source={katexMarkdown(bodyText)}
                />
              </Holder>
            )}
          </CardContent>
          <CardActions>
            {depth < 6 && !isEditing && loggedUser.loggedIn && !deleted ? (
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
        </Card>
      </Container>
      {subcommentTrail.map(({ item: comment, key, props: newStyles }) => (
        <a.div key={key} style={newStyles}>
          <Comment
            docId={docId}
            updateComment={updateComment}
            deleteComment={deleteComment}
            permDelete={permDelete}
            addComment={addComment}
            loggedUser={loggedUser}
            handleReply={handleReply}
            comment={comment}
            user={comment.user}
            key={comment.id}
          />
        </a.div>
      ))}
    </React.Fragment>
  );
}
