import React, { useState, useEffect, useMemo } from 'react';
import { useTransition, animated as a } from 'react-spring';
import Avatar from '@material-ui/core/Avatar';
import Button, { types as btnTypes } from 'components/words/AlfordButton/AlfordButton';
import Field from 'components/words/AlfordField/AlfordField';
import {
  CommentCard,
  Username,
  Padding,
  DepthMeter,
  SuperContainer,
  MarkdownBody,
  Date,
  CommentHeader,
  UserIdentity,
  ButtonContainer,
  ActionsHolder
} from './Comment.styled';
import CommentActions from './utils/CommentActions';
import { Link } from './utils/renderers';
import unified from 'unified';
import parse from 'remark-parse';
// @ts-ignore
import remark2react from 'remark-react';
import { userState, structuredComments, postComment, themeState } from 'global-state';
import 'components/novels/BlogView/markdown.css';

const remarkReactComponents = {
  a: Link
};

interface CommentProps {
  comment: structuredComments | postComment;
  updateComment: (newText: string, id: string) => void;
  deleteComment: (id: string) => void;
  handleReply: (depth: number, id: string) => void;
  permDelete: (id: string) => void;
  loggedUser: userState;
  theme: themeState;
}

const Comment = (props: CommentProps) => {
  const {
    comment,
    updateComment,
    deleteComment,
    handleReply,
    permDelete,
    loggedUser,
    theme
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
    <>
      <SuperContainer>
        {new Array(depth).fill(0).map((_, index) => (
          <DepthMeter theme={theme} key={`depthMeter#${index}`} />
        ))}
        <CommentCard theme={theme} color={user.color}>
          <CommentHeader>
            <div>
              {date && (
                <Date theme={theme} variant='body1'>
                  {date.toLocaleString('default', {
                    year: 'numeric',
                    month: '2-digit',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
                </Date>
              )}
            </div>
            <UserIdentity>
              <Username theme={theme} variant='h4'>
                {user.username}
              </Username>
              {user.image ? (
                <Avatar src={user.image} />
              ) : (
                <Avatar>{(user.username || 'NA').substring(0, 2)}</Avatar>
              )}
            </UserIdentity>
          </CommentHeader>
          <ActionsHolder>
            <CommentActions
              theme={theme}
              loggedUser={loggedUser}
              user={user}
              edit={handleEdit}
              remove={handleDelete}
              permDelete={handlePermDelete}
              isEditing={isEditing}
            />
          </ActionsHolder>
          {!hidden && isEditing ? (
            <Padding>
              <Field
                theme={theme}
                value={bodyText}
                label='Edit Comment'
                fullWidth
                multiline
                onChange={handleBodyTextChange}
              />
            </Padding>
          ) : (
            <MarkdownBody theme={theme} className='markdown-body'>
              {commentDom}
            </MarkdownBody>
          )}
          {!hidden && depth < 6 && !isEditing && loggedUser.loggedIn && (
            <ButtonContainer>
              <Button
                theme={theme}
                type={btnTypes.primary}
                size='small'
                onClick={handleDoReply}>
                Reply
              </Button>
            </ButtonContainer>
          )}
          {!hidden && isEditing && (
            <ButtonContainer>
              <Button
                type={btnTypes.success}
                theme={theme}
                size='small'
                color='primary'
                onClick={handleSave}>
                Save
              </Button>
              <Button
                theme={theme}
                type={btnTypes.link}
                size='small'
                onClick={handleRevert}>
                Cancel
              </Button>
            </ButtonContainer>
          )}
        </CommentCard>
      </SuperContainer>
      {subcommentTrail.map(({ item: comment, key, props: newStyles }) => (
        <a.div key={key} style={newStyles}>
          <Comment
            theme={theme}
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
    </>
  );
};

export default Comment;
