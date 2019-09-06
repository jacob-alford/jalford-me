import React , { useState , useEffect } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Image from 'components/words/Image';

import rpnImage from 'assets/projects/RPN_New.png';
import useRedirect from 'components/bindings/hooks/useRedirect';

const styles = {
  banner:{
    marginTop:"8px",
    height:"100vh",
    minHeight:"338px",
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
  gradientScroller:{
    position:"absolute",
    top:'0px',
    left:'0px',
    width:'100%',
    height:'100%'
  },
  divider:{
    backgroundColor:"white",
    height:"62.8%",
    width:"1px"
  },
  image:{
    width:'33.333333%',
    minWidth:'400px',
    marginLeft:'-200px',
    boxShadow:'0px 0px 70px 0px rgba(0,0,0,.8)'
  },
  paragraph:{
    width:"24%",
    padding:'24px',
    textAlign:'center',
    color:'white'
  },
  subContainer:{
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  button:{
    color:'#fdbb2d',
    backgroundColor:'rgba(0,0,0,.5)',
    borderColor:'white',
    transition:'background-color .4s'
  },
  buttonHover:{
    backgroundColor:'rgba(0,0,0,.2)'
  }
}

export default function RPNFeatured(props){
  const [containerHover,setContainerHover] = useState(false);
  const [buttonHover,setButtonHover] = useState(false);
  const handleOnClick = useRedirect("/projects/rpn");
  let canvasElement = React.createRef();
  const imageLayer = [
    { children:<canvas ref={canvasElement} style={styles.gradientScroller}/>, amount:.1 }
  ];
  const constructOnOver = setter => {
    return () => setter(true);
  }
  const constructOnOut = setter => {
    return () => setter(false);
  }
  useEffect(() => {
    const context = canvasElement.current.getContext("2d");
    const gradient = context.createLinearGradient(50, 50, 300, 300);
    gradient.addColorStop(0, '#1a2a6c');
    gradient.addColorStop(.5, '#b21f1f');
    gradient.addColorStop(1, '#fdbb2d');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 300.000, 300.000);
  },[canvasElement]);
  return (
    <ParallaxBanner style={styles.banner} layers={imageLayer}>
      <div style={(containerHover) ? {...styles.container,...styles.containerHover} : styles.container} onMouseOver={constructOnOver(setContainerHover)} onMouseOut={constructOnOut(setContainerHover)}>
        <Image scrollFade src={rpnImage} alt="RPNCalc" imageStyles={styles.image} naked />
        <div style={styles.divider} />
        <div style={styles.paragraph}>
          <div style={styles.subContainer}>
            <div>
              <Typography variant="h2" paragraph>
                RPN
              </Typography>
              <Typography variant="body1" paragraph>
                An incredibly fluid number crunching experience.  Add to the stack, and reduce!
              </Typography>
            </div>
            <div>
              <Button variant="outlined" onClick={handleOnClick} style={(buttonHover) ? {...styles.button,...styles.buttonHover} : styles.button} onMouseOver={constructOnOver(setButtonHover)} onMouseOut={constructOnOut(setButtonHover)}>
                Check it out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ParallaxBanner>
  );
}
