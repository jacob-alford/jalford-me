import React , { useState } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Image from 'components/words/Image';

import rpnImage from 'assets/projects/RPN_New.png';
import useRedirect from 'components/bindings/hooks/useRedirect';

import { themeHook } from 'theme';

const useClasses = themeHook({
  banner:{
    width:'100vw',
    height:"100vh",
    maxHeight:'750px',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'row',
    background:'linear-gradient(to left, #1a2a6c,#b21f1f,#fdbb2d)'
  },
  divider:{
    backgroundColor:"white",
    height:"62.8%",
    width:"1px",
    marginLeft:'75px',
    marginRight:'75px'
  },
  paragraph:{
    textAlign:'center',
    color:'white',
    padding:'36px',
    flexGrow:2
  },
  subContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  imgHolder:{
    flexShrink:2,
    marginLeft:'-350px',
    overflow:'hidden',
    maxHeight:'100%',
    boxShadow:'0px 0px 77px -32px rgba(0,0,0,0.75)',
    lineHeight:0
  },
  button:{
    color:'#fdbb2d',
    backgroundColor:'rgba(0,0,0,.5)',
    borderColor:'white',
    transition:'background-color .4s'
  },
  buttonHover:{
    backgroundColor:'rgba(0,0,0,.2)'
  },
  image:{
    height:'100%',
    width:'100%',
    minHeight:'550px',
    maxHeight:'700px',
    objectFit:'cover',
    objectPosition:'top right',
    cursor:'pointer'
  }
});

const GradientBackdrop = ({children,style}) => {
  const classes = useClasses();
  return (
    <div className={classes.banner} style={style}>
      {children}
    </div>
  )
}

const constructOnOver = setter => {
  return () => setter(true);
}
const constructOnOut = setter => {
  return () => setter(false);
}

export default function RPNFeatured(props){
  const [buttonHover,setButtonHover] = useState(false);
  const handleOnClick = useRedirect("/projects/rpn");
  const classes = useClasses();
  const screenTooSmall = useMediaQuery('(max-width: 500px)');
  return (
    <GradientBackdrop>
      {(!screenTooSmall) ? (
        <div className={classes.imgHolder}>
          <Image onClick={handleOnClick} className={classes.image} scrollFade src={rpnImage} alt="RPNCalc" naked/>
        </div>
      ) : null}
      <div className={classes.paragraph}>
        <div className={classes.subContainer}>
          <div>
            <Typography variant="h2" paragraph>
              RPN
            </Typography>
            <Typography variant="body1" paragraph>
              An incredibly fluid number crunching experience.  Add to the stack, and reduce!
            </Typography>
          </div>
          <div>
            <Button variant="outlined" onClick={handleOnClick} className={(buttonHover) ? `${classes.button} ${classes.buttonHover}` : classes.button} onMouseOver={constructOnOver(setButtonHover)} onMouseOut={constructOnOut(setButtonHover)}>
              Check it out
            </Button>
          </div>
        </div>
      </div>
    </GradientBackdrop>
  );
}
