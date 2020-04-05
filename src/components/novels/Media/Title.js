import React from 'react';
import { useTransition, animated as a } from 'react-spring';

import MUITypography from '@material-ui/core/Typography';

import { themeHook } from 'theme';

import useTLD from 'components/bindings/hooks/useTLD';

const Typography = a(MUITypography);

const defaultTitles = [
  {
    id: 0,
    text: 'Photos',
    color: { light: 'rgba(0,0,0,.84)', dark: 'rgba(255,255,255,.95)' }
  },
  {
    id: 1,
    text: 'Videos',
    color: { light: 'rgba(0,0,0,.84)', dark: 'rgba(255,255,255,.95)' }
  },
  { id: 2, text: 'Media', color: { light: '#32accc', dark: '#69beef' } }
];

const useClasses = themeHook({
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '60px',
    borderBottom: ({ tldState }) =>
      `2px solid ${tldState === 'light' ? '#232323' : '#fff'}`,
    transition: 'border .25s',
    overflow: 'hidden',
    width: '250px',
    position: 'relative',
    left: 'calc(50% - 125px)'
  },
  text: {
    position: 'absolute',
    transition: 'color .25s'
  }
});

export default function Title(props) {
  const { index } = props;
  const [tldState] = useTLD();
  const classes = useClasses({ tldState, index });
  const transitions = useTransition(defaultTitles[index], title => title.id, {
    from: { transform: `translate3d(0,60px,0)`, opacity: 0 },
    enter: { transform: `translate3d(0,0px,0)`, opacity: 1 },
    leave: { transform: `translate3d(0,-60px,0)`, opacity: 0 }
  });
  return (
    <div className={classes.container}>
      {transitions.map(({ item: { text, color }, props: newStyle, key }) => (
        <Typography
          key={key}
          style={{ ...newStyle, color: color[tldState] }}
          className={classes.text}
          variant='h2'>
          {text}
        </Typography>
      ))}
    </div>
  );
}
