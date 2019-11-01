import React , { useState , useEffect , useRef } from 'react';
import { useTransition , animated as a } from 'react-spring';

import Container from '@material-ui/core/Container';

import LightDarkToggler from 'components/words/LightDarkToggler';
import Holder from 'components/words/Holder';

import IconBar from './IconBar.js';
import Title from './Title.js';
import Photos from './Photos';

import useTLD from 'components/bindings/hooks/useTLD';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import { themeHook } from 'theme';

const mediaPages = {
  'photos':Photos,
  'videos':Photos
}

const useClasses = themeHook(
  ['getDarkBackground','getLightBackground'],
  ([darkBg,lightBg]) => ({
    container:{
      width:'100%',
      background: ({tldState}) => (tldState === 'light') ? lightBg : darkBg,
      transition: 'background .5s, color .5s'
    },
    togglerHolder:{
      width:'100%'
    },
    viewHolder:{
      display:'flex',
      width:'200vw',
      overflow:'hidden',
      flexDirection:'row'
    },
    view:{
      
    }
  })
);

const indexResolve = pane => (pane === 'photos') ? 0 : 1;
const getFromTranslate = pane =>
  (pane === 'photos') ?
    `translate3d(-100vw,0,0)`
  : `translate3d(100vw,0,0)`;
const getToTranslate = pane =>
  (pane === 'photos') ?
    `translate3d(0,0,0)`
  : `translate3d(0,0,0)`;
const getLeaveTranslate = pane =>
  (pane === 'photos') ?
    `translate3d(100vw,0,0)`
  : `translate3d(-100vw,0,0)`;

function Media(){
  const [tldState,toggleTld] = useTLD();
  const [currentPane,setCurrentPane] = useState('photos');
  const [tIndex,settIndex] = useState(0);
  const [parentHeight,setParentHeight] = useState(null);
  const classes = useClasses({tldState});
  const mediaTransitories = useTransition(currentPane, null, {
    initial:{ opacity:0 },
    from:{ opacity:0 },
    enter:{ opacity:1 },
    leave:{ opacity:0 }
  });
  const photosRef = useRef(null);
  useEffect(() => {
    if(photosRef.current)
      setParentHeight(photosRef.current.clientHeight + 228 + 50);
  },[]);
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
    <Container className={classes.container} style={{height:`${parentHeight}px`}}>
      <Holder className={classes.togglerHolder} justify='flex-end' direction='row'>
        <LightDarkToggler mode={tldState} toggle={toggleTld} />
      </Holder>
      <Title index={tIndex}/>
      <Holder>
        <IconBar pane={currentPane} setVideo={setVideo} setPhotos={setPhotos}/>
      </Holder>
      <div className={classes.viewHolder}>
        {mediaTransitories.map(({item,key,props:newStyle},index) => {
          const Item = mediaPages[item];
          return (
            <a.div key={key} style={newStyle} className={classes.view}>
              <Item ref={photosRef} title={item}/>
            </a.div>
          );
        })}
      </div>
    </Container>
  );
}

export default withPageFade(Media);
