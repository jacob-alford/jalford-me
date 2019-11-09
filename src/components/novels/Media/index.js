import React , { useState , useEffect } from 'react';
import { useSpring , animated as a } from 'react-spring';

import Container from '@material-ui/core/Container';

import LightDarkToggler from 'components/words/LightDarkToggler';
import Holder from 'components/words/Holder';

import IconBar from './IconBar.js';
import Title from './Title.js';
import Photos from './Photos';

import useTLD from 'components/bindings/hooks/useTLD';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import { themeHook } from 'theme';

const useClasses = themeHook(
  ['getDarkBackground','getLightBackground','getMajorSpacing'],
  ([darkBg,lightBg,majorSpacing]) => ({
    container:{
      background: ({tldState}) => (tldState === 'light') ? lightBg : darkBg,
      transition: 'background .5s, color .5s',
      width:'100vw',
      overflowX:'hidden'
    },
    togglerHolder:{
      width:'100%',
      paddingTop:'12px'
    },
    viewHolder:{
      position:'relative',
      width:'200%',
      display:'flex',
      overflow:'hidden',
      flexDirection:'row'
    },
    view:{

    },
    seperator:{
      width:`calc(100% - ${2 * parseInt(majorSpacing,10)}px)`,
      height:'1px',
      backgroundColor: ({tldState}) => (tldState === 'light') ? 'black' : 'white',
      margin:majorSpacing,
      marginTop:'0px',
      transition:'color .5s'
    }
  })
);

function Media(){
  const [tldState,toggleTld] = useTLD();
  const classes = useClasses({tldState});
  const [currentPane,setCurrentPane] = useState('photos');
  const [tIndex,settIndex] = useState(0);
  const [transitionStyles,setTransitionState] = useSpring(() => ({
    left:'0%'
  }));
  useEffect(() => {
    if(tIndex !== 2){
      const timeout = setTimeout(() => settIndex(2),5000);
      return () => clearTimeout(timeout);
    }
  },[tIndex]);
  const setVideo = () => {
    if(currentPane !== 'videos'){
      setCurrentPane('videos');
      settIndex(1);
      setTransitionState({left:'-100%'});
    }
  }
  const setPhotos = () => {
    if(currentPane !== 'photos'){
      setCurrentPane('photos');
      settIndex(0);
      setTransitionState({left:'0%'});
    }
  }
  return (
    <Container className={classes.container}>
      <Holder className={classes.togglerHolder} justify='flex-end' direction='row'>
        <LightDarkToggler mode={tldState} toggle={toggleTld} />
      </Holder>
      <Title index={tIndex}/>
      <Holder>
        <IconBar pane={currentPane} setVideo={setVideo} setPhotos={setPhotos}/>
      </Holder>
      <div className={classes.seperator} />
      <a.div style={transitionStyles} className={classes.viewHolder}>
        <Photos title='Gallery' active={currentPane === 'photos'}/>
        <Photos title='YouTube' active={currentPane === 'videos'} />
      </a.div>
    </Container>
  );
}

export default withPageFade(Media);
