import React , { useState , useRef , useEffect } from 'react';
import OpenSeadragon from 'openseadragon';

import Typography from '@material-ui/core/Typography';

import Loader from 'components/words/Loader';
import Holder from 'components/words/Holder';

import useClasses from './style.js';
import useTitleSize from 'components/bindings/hooks/useTitleSize';

import { firebase } from 'firebase.js';

export default function Puzzle2(props){
  const [isLoading,setIsLoading] = useState(true);
  const [heading,setHeading] = useState("February 22");
  const { h1:titleSize } = useTitleSize();
  const viewer = useRef(null);
  const viewerEl = useRef();
  const classes = useClasses(props);
  useEffect(() => {
    if(viewerEl.current){
      viewer.current = OpenSeadragon({
        element:viewerEl.current,
        tileSources:{
          type:"zoomifytileservice",
          width:6265,
          height:4581,
          tilesUrl:"/publicAssets/Lamgods_open/"
        },
        immediateRender:true,
        showNavigator:true,
        preload:true,
        showNavigationControl:false,
        defaultZoomLevel:1
      });
      viewer.current.addOnceHandler('open',() => setIsLoading(false));
    }
  },[]);
  return (
    <Holder className={classes.puzzleHolder}>
      {(isLoading) ? <Loader /> : null}
      {(!isLoading) ? (
        <Typography variant="h1" className={classes.title} style={{fontSize:titleSize}}>
          {heading}
        </Typography>
      ) : null}
      <div id="puzzle2OSDViewer" ref={viewerEl} className={classes.viewer} style={{display:(isLoading) ? 'none' : null}}></div>
    </Holder>
  );
}
