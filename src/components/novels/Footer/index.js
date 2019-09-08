import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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

export default function Footer(props){
  return (
    <Container style={styles.container}>
      <Typography style={styles.text} variant="body1">
        {footerText}
      </Typography>
    </Container>
  );
}
