import React from 'react';
import { Motion , spring } from 'react-motion';
import { Typography } from '@material-ui/core/';

import NavBar from '../../sentences/NavBar';

import { navItems } from '../../../config';

const styles = {
  title:{
    fontWeight:'bold',
    fontSize:'3.5rem',
    textAlign:'center',
    color:'#ffe'
  }
}

export default function Header(props){
  const { headerIsOpen } = props;
  return (
    <Motion
      defaultStyle={{opacity:1}}
      style={{
        opacity:(headerIsOpen) ?
            spring(1)
          : spring(0)
      }}>
      {newStyles => (
        <div style={newStyles}>
          <Typography style={styles.title} variant="h1" paragraph>
            Jacob Alford
          </Typography>
          <NavBar navList={navItems} />
        </div>
      )}
    </Motion>
  );
}
