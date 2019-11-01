import React from 'react';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import PhotoGrid from '../PhotoGrid.js';

import { themeHook } from 'theme';

const sections = [
  {title:'people',photos:[
    {url:'https://images.unsplash.com/photo-1571896625889-b1e41a9051b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',width:1350},
    {url:'https://images.unsplash.com/photo-1571907483086-3c0ea40cc16d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',width:1350},
    {url:'https://images.unsplash.com/photo-1571926819823-de3c37241e89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80',width:1266},
    {url:'https://images.unsplash.com/photo-1571859939884-50b51d4cbc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',width:800}
  ]}
];

const useClasses = themeHook({
  photosHolder:{
    position:'absolute',
    maxWidth:'85%'
  },
  title:{
    color:'rgba(0,0,0,.84)',
    fontWeight:'lighter'
  }
});

const Photos = React.forwardRef(({title},ref) => {
  const classes = useClasses();
  return sections.map(section => (
    <div key={section.title} className={classes.photosHolder} ref={ref}>
      <Typography variant="h3" paragraph className={classes.title}>
        {title}
      </Typography>
      <PhotoGrid photos={section.photos} />
    </div>
  ));
});

export default Photos;
