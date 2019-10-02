import React , { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';

import Image from 'components/words/Image';
import Container from 'components/words/Holder';
import LiveDemo from 'components/words/ArrowLink';

import { themeHook } from 'theme';

import useTitleSize from 'components/bindings/hooks/useTitleSize';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useReactRouter from 'use-react-router';

const useClasses = themeHook(
  ['getGutter'],
  ([gutter]) => ({
    title:{
      textAlign:'center',
      color:({featured}) => (featured) ? '#fff' : '#223',
      fontWeight:'bold'
    },
    subtitle:{
      textAlign:'center',
      color:({featured}) => (featured) ? '#fff' : '#223'
    },
    superContainer:{
      width:'100%',
      paddingTop:'96px',
      backgroundColor:({featured}) => (featured) ? '#232323' : '#fefeff'
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
      marginBottom:gutter,
      fontSize:'1.25rem',
      color:'#3af'
    },
    date:{
      fontWeight:'lighter',
      color:({featured}) => (featured) ? '#ffe' : '#223',
      marginTop:gutter,
      marginBottom:gutter
    }
  })
);

const resolveDirection = tooSmall => (tooSmall) ? 'col' : 'row';

export default function TemplateWebsite(props){
  const { heading , tagline , action , techRP , image , year , video } = props;
  const { h2:titleSize , h5:captionSize } = useTitleSize();
  const screenTooSmall = useMediaQuery('(max-width:450px)');
  const tooSmall4Img = useMediaQuery('(max-width:600px)');
  const classes = useClasses(props);
  const { history } = useReactRouter();
  const handleImgRedirect = useCallback(() => {
    if((image && image.href.includes('http')) || (video && video.href.includes('http')))
      window.location.href = image.href;
    else
      history.push((image && image.href) || (video && video.href));
  },[image,video,history]);
  return (
    <Container direction='col' className={classes.superContainer} justify='space-evenly'>
      <Container direction='col'>
        <Typography paragraph variant="h2" className={classes.title} style={{fontSize:titleSize}}>
          {heading}
        </Typography>
        <Typography paragraph variant="body2" className={classes.subtitle} style={{fontSize:captionSize}}>
          {tagline}
        </Typography>
      </Container>
      {(!action.disabled) ?
        <Container direction="row" justify="space-around" className={classes.button}>
          <LiveDemo text={action.text} href={action.href}/>
        </Container>
      : null}
      <Container direction={resolveDirection(screenTooSmall)} justify='space-between' className={classes.itemContainer}>
        {techRP()}
      </Container>
      {(year) ?
        <Container>
          <Typography variant="h4" className={classes.date}>
            {year}
          </Typography>
        </Container>
      : null}
      {(image) ?
        <Container justify='flex-start' className={classes.imageHolder} style={{marginBottom: (tooSmall4Img) ? '0px' : '96px'}}>
          <Image
            src={image.source}
            fallbackSrc={image.altSource}
            naked
            scrollFade
            onClick={handleImgRedirect}
            className={classes.image}
            imageStyles={{
              width:(tooSmall4Img) ? '100vw' : '75vw'
            }}/>
        </Container>
      : null}
      {(video) ?
        <Container justify='flex-start' className={classes.imageHolder} style={{marginBottom: (tooSmall4Img) ? '0px' : '96px'}}>
          <video
            src={video.source}
            autoPlay
            loop
            className={classes.image}
            style={{
              width:(tooSmall4Img) ? '100vw' : '75vw'
            }}/>
        </Container>
      : null}
    </Container>
  );
}
