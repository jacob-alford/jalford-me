import React from 'react';
import { useSpring , animated as a } from 'react-spring';

import Typography from '@material-ui/core/Typography';

import NavBar from 'components/sentences/NavBar';

import { navItems } from 'config';

const styles = {
  title:{
    fontWeight:'bold',
    fontSize:'3.5rem',
    textAlign:'center',
    color:'#ffe'
  }
}

const getScaleString = headerIsOpen => {
  const scale = (headerIsOpen) ? 1 : 0;
  return `scale3d(${scale},${scale},${scale})`;
}

export default function Header(props){
  const { headerIsOpen } = props;
  const interStyles = useSpring({
    opacity:(headerIsOpen) ? 1 : 0,
    transform:getScaleString(headerIsOpen),
    from:{
      transform:getScaleString(false)
    }
  });
  return (
    <a.div style={interStyles}>
      <Typography style={styles.title} variant="h1" paragraph>
        Jacob Alford
      </Typography>
      <NavBar navList={navItems} />
    </a.div>
  );
}
