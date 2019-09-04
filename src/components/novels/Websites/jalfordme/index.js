import React from 'react';
import {
  Typography
} from '@material-ui/core/';
import { KeyboardArrowRight } from '@material-ui/icons';

import reactlogo from '../../../../assets/websites/reactlogo.svg';
import reduxlogo from '../../../../assets/websites/reduxlogo.svg';
import firebaselogo from '../../../../assets/websites/firebaselogo.svg';

import featured from '../../../../assets/websites/jalfordme_feat.png';
import featured2 from '../../../../assets/websites/jalfordme_feat2.png';

import Image from '../../../words/Image';

import useTitleSize from '../../../bindings/hooks/useTitleSize';
import useHoverHandler from '../../../bindings/hooks/useHoverHandler';
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
  container:{
    display:'flex'
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
  item:{
    margin:'6px',
    marginRight:'8px',
    marginLeft:'8px',
    cursor:'pointer',
    userSelect:'none',
    WebkitTouchCallout:'none',
    WebkitUserSelect:'none'
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

const resolveDir = dir => (dir === 'col' || dir === 'column') ? 'column' : 'row';
const resolveWrap = wrap => (wrap) ?
                              (typeof wrap === 'string') ?
                                wrap
                              : 'wrap'
                            : 'nowrap';
const resolveDirection = tooSmall => (tooSmall) ? 'col' : 'row';

const Container = props => {
  const {
    direction = 'column',
    justify = 'center',
    align='center',
    style,
    wrap = 'wrap'
  } = props;
  return (
    <div
      style={{
        ...styles.container,
        ...style,
        justifyContent:justify,
        alignItems:align,
        flexWrap:resolveWrap(wrap),
        flexDirection:resolveDir(direction)
      }}>
      {props.children}
    </div>
  );
}

const TechListing = props => {
  const { img , text , url } = props;
  const handleRedirect = () => window.location.href = url;
  return (
    <Container direction='row' style={styles.item}>
      <img src={img} width='32' height='32' alt={text}/>
      <Typography variant="h6" style={{color:'white'}} onClick={handleRedirect}>
        {text}
      </Typography>
    </Container>
  );
}

const LiveDemo = props => {
  const hoverHandlers = useHoverHandler({
    base:{
      cursor:'pointer'
    },
    over:{
      textDecoration:'underline'
    },
    out:{
      textDecoration:'none'
    }
  });
  const { history } = useReactRouter();
  return (
    <Container direction='row'>
      <div {...hoverHandlers} onClick={() => history.push('/')}>
        Live Demo
      </div>
      <KeyboardArrowRight style={{marginTop:'.3rem'}}/>
    </Container>
  );
}

export default function Jalfordme(){
  const { h2:titleSize , h5:captionSize } = useTitleSize();
  const screenTooSmall = useMediaQuery('(max-width:400px)');
  const tooSmall4Img = useMediaQuery('(max-width:600px)');
  const { history } = useReactRouter();
  const handleGotoPosts = () => history.push('/posts');
  const handleGotoRPN = () => history.push('/projects/rpn');
  return (
    <Container direction='col' style={styles.superContainer} justify='space-evenly'>
      <Container direction='col'>
        <Typography paragraph variant="h2" style={{...styles.title,fontSize:titleSize}}>
          jalford.me
        </Typography>
        <Typography paragraph variant="body2" style={{...styles.subtitle,fontSize:captionSize}}>
          Inspiring artful design, and proper practice
        </Typography>
      </Container>
      <Container direction="row" justify="space-around" style={styles.button}>
        <LiveDemo />
      </Container>
      <Container direction={resolveDirection(screenTooSmall)} justify='space-between' style={styles.itemContainer}>
        <TechListing img={reactlogo} text="React" url='https://reactjs.org/'/>
        <TechListing img={reduxlogo} text="Redux" url='https://react-redux.js.org/'/>
        <TechListing img={firebaselogo} text="Firebase" url='https://firebase.google.com/'/>
      </Container>
      <Container justify='flex-start' style={{...styles.imageHolder}}>
        <Image
          src={featured2}
          naked
          scrollFade
          onClick={handleGotoPosts}
          imageStyles={{
            ...styles.image,
            width:(tooSmall4Img) ? '100vw' : '75vw'
          }}/>
      </Container>
      <Container
        justify='flex-start'
        style={{
          ...styles.imageHolder,
          marginBottom:(tooSmall4Img) ? '0px' : '96px',
          marginTop:(tooSmall4Img) ? '0px' : '96px'
        }}>
        <Image
          src={featured}
          scrollFade
          naked
          onClick={handleGotoRPN}
          imageStyles={{
            ...styles.image,
            width:(tooSmall4Img) ? '100vw' : '75vw'
          }}/>
      </Container>
    </Container>
  );
}
