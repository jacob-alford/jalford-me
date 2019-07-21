import React , { useState } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Typography , Button , Divider } from '@material-ui/core/';

import { homePageImage } from '../../../../config';

const styles = {
  banner:{
    marginTop:"8px",
    height:"100vh",
    maxHeight:"500px"
  },
  bannerHover:{
    marginTop:"8px",
    height:"100vh",
    maxHeight:"500px"
  },
  children:{
    position:'absolute',
    top:'0',
    left:'0',
    right:'0',
    bottom:'0',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    transition:'box-shadow .5s',
    boxShadow:'inset 0px 0px 0px 0px rgba(95,180,237,1)'
  },
  childrenHover:{
    boxShadow:'inset 0px 0px 70px 0px rgba(95,180,237,1)'
  },
  button:{
    color:'#5FB4ED',
    backgroundColor:'rgba(0,0,0,.5)',
    borderColor:'white',
    transition:'background-color .4s'
  },
  buttonHover:{
    backgroundColor:'rgba(0,0,0,.2)'
  },
  sweetText:{
    fontWeight:'bold',
    background:'-webkit-linear-gradient(#CDE0F0, #9AC1E0)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent',
    boxShadow:'0px 4px 59px -25px rgba(0,0,0,.8)'
  },
  divider:{
    backgroundColor:"white",
    width:"50vw",
    marginTop:"25px",
    marginBottom:"25px"
  }
}

export default function IceCaveFeatured(props){
  const [isHovering,setIsHovering] = useState(false);
  const [buttonHover,setButtonHover] = useState(false);
  const imageLayer = [
    { image:homePageImage.img, amount:.2 }
  ];
  const handleOnClick = () => {
    window.location.href = "https://www.icecaves.com/";
  }
  return (
    <ParallaxBanner style={styles.banner} layers={imageLayer}>
      <div style={(isHovering) ? {...styles.children,...styles.childrenHover} : styles.children} onMouseOut={() => setIsHovering(false)} onMouseOver={() => setIsHovering(true)} >
        <Typography variant="h2" style={styles.sweetText}>
          Ice Cave and Bandera Volcano
        </Typography>
        <Divider style={styles.divider} light component="div"/>
        <Button style={(buttonHover) ? {...styles.button,...styles.buttonHover} : styles.button} onMouseOut={() => setButtonHover(false)} onMouseOver={() => setButtonHover(true)} variant="outlined" onClick={handleOnClick}>
          Check it out
        </Button>
      </div>
    </ParallaxBanner>
  );
}
