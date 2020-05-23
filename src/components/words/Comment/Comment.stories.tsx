import React from 'react';
import StylishComment from './Comment';
import { action } from '@storybook/addon-actions';
import { color, select, withKnobs, date, text, number } from '@storybook/addon-knobs';
import { themeState } from 'global-state';
import { getRandomUID } from 'functions';
import C from 'theme-constants';

export default {
  title: 'Comment',
  component: StylishComment,
  decorators: [withKnobs]
};

const defaultDate = new Date();
const id = getRandomUID();
const uid = getRandomUID();
const parentId = null;
const logUserUid = getRandomUID();

export const Comment = () => {
  const theme = select(
    'Theme',
    { light: themeState.light, dark: themeState.dark },
    themeState.light
  );

  const userColor = color('Color', '#14b2c7', 'Post Details');
  const body = text('Body', 'Hello, \n\nThis was truly marvelous', 'Post Details');
  const postId = text('Post UID', id, 'Post Detauls');
  const dateTimestamp = date('Date', defaultDate, 'Post Details');
  const depth = number(
    'Depth',
    0,
    { range: true, min: 0, max: 5, step: 1 },
    'Post Details'
  );
  const image = text(
    'Image URL',
    'https://i.ytimg.com/vi/Nm1kkptgSjs/maxresdefault.jpg',
    'Post Details'
  );
  const username = text('Username', 'Plato Splunk', 'Post Details');
  const userUID = text('Post-User UID', uid, 'Post Details');

  const permissions = number(
    'Logged User Permissions',
    0,
    { range: true, min: 0, max: 10, step: 1 },
    'Logged User Details'
  );
  const loggedUserUID = text('Logged-User UID', logUserUid, 'Logged User Details');
  return (
    <div
      style={{
        background: C.contBackAlt(theme),
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '14px'
      }}>
      <StylishComment
        updateComment={action('Comment Updated')}
        deleteComment={action('Comment Deleted')}
        handleReply={action('Handle Reply')}
        permDelete={action('Permanently Deleted')}
        comment={{
          date: new Date(dateTimestamp),
          body,
          depth,
          id: postId,
          parentId,
          user: {
            image,
            uid: userUID,
            username,
            color: userColor
          }
        }}
        theme={theme}
        loggedUser={{
          hydrated: true,
          loggedIn: true,
          details: {
            uid: loggedUserUID,
            color: '#14b2c7',
            image: '',
            permissions: {
              value: permissions
            },
            username: 'Plato Splunk',
            puzzles: []
          }
        }}
      />
    </div>
  );
};
Comment.story = {
  name: 'Post Comment'
};
