import React from 'react';

import Container from 'components/words/Holder';

import loader from 'assets/svg-loaders/puff.svg';

import themeConstruct from 'theme';

const styles = themeConstruct(
  ['getCardPadding','getMajorSpacing'],
  ([padding,spacing]) => ({
    superHolder:{
      width:'100vw'
    },
    holder:{
      padding:padding,
      marginTop:spacing,
      width:'100px',
      height:'100px'
    }
  })
);

export default function Loader(){
  return (
    <Container style={styles.superholder}>
      <Container style={styles.holder}>
        <img src={loader} width='50' height='50' alt='loader'/>
      </Container>
    </Container>
  );
}
