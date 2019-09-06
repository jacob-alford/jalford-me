import React , { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';

import Image from '../../words/Image';
import Container from '../../words/Holder';
import LiveDemo from '../../words/ArrowLink';

import useTitleSize from '../../bindings/hooks/useTitleSize';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useReactRouter from 'use-react-router';

const styles = {
  title:{
    textAlign:'center',
    color:'#223',
    fontWeight:'bold'
  },
  subtitle:{
    textAlign:'center'
  },
  superContainer:{
    width:'100%',
    paddingTop:'96px',
    backgroundColor:'#fefeff'
  },
  image:{
    width:'75vw',
    maxWidth:'1200px',
    cursor:'pointer'
  },
  imageHolder:{
    overflowY:'hidden',
    marginTop:'96px',
    boxShadow:'0px 0px 77px -32px rgba(0,0,0,.75)'
  },
  itemContainer:{
    padding:'14px',
    borderRadius:'5px',
    backgroundColor:'black'
  },
  button:{
    marginBottom:'16px',
    fontSize:'1.25rem',
    color:'#3af'
  }
}

const resolveDirection = tooSmall => (tooSmall) ? 'col' : 'row';

export default function TemplateWebsite(props){
  const { heading , tagline , action , techRP , image } = props;
  const { h2:titleSize , h5:captionSize } = useTitleSize();
  const screenTooSmall = useMediaQuery('(max-width:400px)');
  const tooSmall4Img = useMediaQuery('(max-width:600px)');
  const { history } = useReactRouter();
  const handleImgRedirect = useCallback(() => {
    if(image.href.includes('http'))
      window.location.href = image.href;
    else
      history.push(image.href)
  },[image.href,history]);
  return (
    <Container direction='col' style={styles.superContainer} justify='space-evenly'>
      <Container direction='col'>
        <Typography paragraph variant="h2" style={{...styles.title,fontSize:titleSize}}>
          {heading}
        </Typography>
        <Typography paragraph variant="body2" style={{...styles.subtitle,fontSize:captionSize}}>
          {tagline}
        </Typography>
      </Container>
      <Container direction="row" justify="space-around" style={styles.button}>
        <LiveDemo text={action.text} href={action.href}/>
      </Container>
      <Container direction={resolveDirection(screenTooSmall)} justify='space-between' style={styles.itemContainer}>
        {techRP()}
      </Container>
      <Container justify='flex-start' style={{...styles.imageHolder, marginBottom: (tooSmall4Img) ? '0px' : '96px'}}>
        <Image
          src={image.source}
          naked
          scrollFade
          onClick={handleImgRedirect}
          imageStyles={{
            ...styles.image,
            width:(tooSmall4Img) ? '100vw' : '75vw'
          }}/>
      </Container>
    </Container>
  );
}
