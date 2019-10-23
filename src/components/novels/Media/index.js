import React , { useState } from 'react';

import Container from '@material-ui/core/Container';

import LightDarkToggler from 'components/words/LightDarkToggler';
import Holder from 'components/words/Holder';

import IconBar from './IconBar.js';

import useTLD from 'components/bindings/hooks/useTLD';

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

export default function Media(){
  const [tldState,toggleTld] = useTLD();
  const [currentPane,setCurrentPane] = useState('photos');
  const classes = useClasses({tldState});
  const setVideo = () => {
    if(currentPane !== 'videos')
      setCurrentPane('videos');
  }
  const setPhotos = () => {
    if(currentPane !== 'photos')
      setCurrentPane('photos');
  }
  return (
    <Container className={classes.container}>
      <Holder className={classes.togglerHolder} justify='flex-end' direction='row'>
        <LightDarkToggler mode={tldState} toggle={toggleTld} />
      </Holder>
      <Holder>
        <IconBar pane={currentPane} setVideo={setVideo} setPhotos={setPhotos}/>
      </Holder>
    </Container>
  );
}
