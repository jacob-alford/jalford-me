import React from 'react';

import { useSpring , animated as a } from 'react-spring';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useHoverHandlers from 'components/bindings/hooks/useHoverHandler';
import useRedirect from 'components/bindings/hooks/useRedirect';

import { themeHook } from 'theme';

const useClasses = themeHook({
  banner:{
    height:"100vh",
    maxHeight:"750px",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    textAlign:'center',
    overflow:'hidden'
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
    color:'black',
    backgroundColor:'rgba(0,0,0,.5)',
    borderColor:'white',
    transition:'background-color .4s'
  },
  sweetText:{
    fontWeight:'bold',
    fontFamily:'monospace',
    background:'-webkit-linear-gradient(#2C5364,#203A43,#0F2027)',
    color:'black',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent'
  },
  divider:{
    height:'2px',
    backgroundColor:"white",
    width:"50vw",
    marginTop:"25px",
    marginBottom:"25px"
  }
});

const hoverStyles = {
  button:{
    color:'white',
    backgroundColor:'rgba(0,0,0,1)',
    borderColor:'white',
    transition:'background-color .4s'
  },
  buttonHover:{
    backgroundColor:'rgba(0,0,0,.2)'
  },
  banner:{
    marginTop:"8px",
    height:"100vh",
    maxHeight:"500px"
  },
  bannerHover:{
    marginTop:"8px",
    height:"100vh",
    maxHeight:"500px"
  }
}

const FadingBackdrop = ({children,className}) => {
  const classes = useClasses();
  const newStyles = useSpring({
    from: { background: 'lightslategrey' },
    config:{
      duration:7500
    },
    to: [
      { background: 'lightblue' },
      { background: 'lightgoldenrodyellow' },
      { background: 'lightpink' },
      { background: 'lightsalmon' },
      { background: 'lightcoral' },
      { background: 'lightseagreen' },
      { background: 'lightskyblue' },
      { background: 'lightgreen' }
    ]
  });
  return (
    <a.div style={newStyles} className={classes.banner}>
      {children}
    </a.div>
  )
}

export default function IceCaveFeatured(props){
  const classes = useClasses();
  const hoverHandlers = useHoverHandlers({
    base:hoverStyles.children,
    over:hoverStyles.childrenHover
  });
  const btnHoverHandlers = useHoverHandlers({
    base:hoverStyles.button,
    over:hoverStyles.buttonHover
  });
  const btnClick = useRedirect("/websites");

  return (
    <FadingBackdrop>
      <div {...hoverHandlers}>
        <Typography variant="h2" className={classes.sweetText}>
          Websites
        </Typography>
        <div className={classes.divider} />
        <Button {...btnHoverHandlers} variant="outlined" onClick={btnClick}>
          Enter
        </Button>
      </div>
    </FadingBackdrop>
  );
}
