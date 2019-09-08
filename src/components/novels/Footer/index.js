import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { animated as a , useSpring } from 'react-spring';

import themeConstruct from 'theme';

import { footerText } from 'config';

const styles = themeConstruct(
  [
    'getFooterColor',
    'getFooterBg',
    'getMajorSpacing',
    'getMinorSpacing'
  ],
  ([textColor, footerBg, majorSpacing, minorSpacing]) => ({
    text:{
      color:textColor,
      textAlign:'center'
    },
    container:{
      background:footerBg,
      marginTop:minorSpacing,
      padding:majorSpacing
    }
  })
);

export default function Footer(){
  const fadeIn = useSpring({
    opacity:1,
    from:{
      opacity:0
    },
    delay:1000
  });
  return (
    <Container style={styles.container}>
      <Typography style={styles.text} variant="body1">
        <a.span style={fadeIn}>{footerText}</a.span>
      </Typography>
    </Container>
  );
}
