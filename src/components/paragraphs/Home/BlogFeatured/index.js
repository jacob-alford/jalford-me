import React , { useState , useEffect } from 'react';
import { withRouter } from 'react-router';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Typography } from '@material-ui/core/';

import flowerImage from '../../../../assets/photos/Posts_Flower.jpg';

import Typed from 'typed.js';

const styles = {
  banner:{
    marginTop:"8px",
    height:"100vh",
    maxHeight:"500px"
  },
  container:{
    position:'absolute',
    top:'0',
    left:'0',
    right:'0',
    bottom:'0',
    display:'flex',
    flexDirection:'row',
    flexWrap:'nowrap',
    justifyContent:'space-evenly',
    alignItems:'center',
    transition:'box-shadow .25s',
    boxShadow:'inset 0px 0px 70px 0px rgba(0,0,0,.8)'
  },
  containerHover:{
    boxShadow:'inset 0px 0px 95px 0px rgba(0,0,0,.8)'
  },
  canvas:{
    position:"absolute",
    top:'0px',
    left:'0px',
    width:'100%',
    height:'100%'
  },
  title:{
    color:'white'
  }
}

function BlogFeatured(props){
  const { history } = props;
  const [containerHover,setContainerHover] = useState(false);
  const imageLayer = [
    { image:flowerImage, amount:.2 }
  ];
  const handleOnClick = () => history.push('/blog');
  const constructOnOver = setter => {
    return () => setter(true);
  }
  const constructOnOut = setter => {
    return () => setter(false);
  }
  return (
    <ParallaxBanner style={styles.banner} layers={imageLayer}>
      <div style={(containerHover) ? {...styles.container,...styles.containerHover} : styles.container} onMouseOver={constructOnOver(setContainerHover)} onMouseOut={constructOnOut(setContainerHover)}>
        <Typography variant="h1" paragraph style={styles.title}>
          Blog |
        </Typography>
      </div>
    </ParallaxBanner>
  );
}

export default withRouter(BlogFeatured);
