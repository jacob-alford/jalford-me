import React , { useState , useEffect } from 'react';

import Container from '@material-ui/core/Container';

import LightDarkToggler from 'components/words/LightDarkToggler';
import Holder from 'components/words/Holder';

import IconBar from './IconBar.js';
import Title from './Title.js';

import useTLD from 'components/bindings/hooks/useTLD';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import { themeHook } from 'theme';

const useClasses = themeHook(
  ['getDarkBackground','getLightBackground'],
  ([darkBg,lightBg]) => ({
    container:{
      background: ({tldState}) => (tldState === 'light') ? lightBg : darkBg,
      transition: 'background .5s, color .5s'
    },
    togglerHolder:{
      width:'100%'
    }
  })
);

const indexResolve = pane => (pane === 'photos') ? 0 : 1;

function Media(){
  const [tldState,toggleTld] = useTLD();
  const [currentPane,setCurrentPane] = useState('photos');
  const [tIndex,settIndex] = useState(0);
  const classes = useClasses({tldState});
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
    }
  }
  const setPhotos = () => {
    if(currentPane !== 'photos'){
      setCurrentPane('photos');
      settIndex(0);
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
    </Container>
  );
}

export default withPageFade(Media);
