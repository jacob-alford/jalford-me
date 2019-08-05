import React , { useEffect , useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Grid, IconButton , Typography } from '@material-ui/core/';
import { ArrowForwardIos , ArrowBackIos } from '@material-ui/icons';

import { ParallaxBanner } from 'react-scroll-parallax';

import useSeriesConnect from '../../../bindings/hooks/useSeriesConnect';

import BlogCard from '../../../words/BlogListing/BlogCard';

const styles = {
  canvas:{
    position:"absolute",
    left:"0px",
    top:"0px",
    width:'100%',
    height:'100%',
    background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
    filter: 'blur(.15em)'
  },
  parallaxContainer:{
    width:"100vw",
    minHeight:"1000px"
  },
  container:{
    position:'absolute',
    top:'0',
    left:'0',
    right:'0',
    bottom:'0',
    boxShadow:'inset 0px 0px 70px 0px rgba(0,0,0,.8)'
  },
  navButton:{
    color:"white"
  },
  header:{
    textAlign:'center',
    background:'linear-gradient(#FF416C,#FF4B2B)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent'
  }
}

// 94892796

export default function DuncanStrauss(){
  const data = useSeriesConnect("Duncan");
  const [selectedDuncan,setSelectedDuncan] = useState(0);
  const navRight = () => {
    if(data.postData && data.postData.length > 0)
      setSelectedDuncan((selectedDuncan + 1) % data.postData.length);
  }
  const navLeft = () => {
    if(data.postData && data.postData.length > 0)
      setSelectedDuncan((selectedDuncan - 1 >= 0) ? selectedDuncan - 1 : data.postData.length - 1);
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft:navLeft,
    onSwipedRight:navRight
  });

  const bgCanvas = React.useRef();
  const imageLayer = [
    { children: <canvas ref={bgCanvas} style={styles.canvas}/> , amount:.1 }
  ];

  useEffect(() => {
    const context = bgCanvas.current.getContext("2d");
    const width = bgCanvas.current.width;
    const height = bgCanvas.current.height;

    context.strokeStyle = 'rgba(174,194,224,.5)';
    context.lineWidth = .25;
    context.lineCap = 'round';

    const particles = [];
    for(let i=0;i<1000;i++)
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: Math.random() * .25,
        dy: Math.random() * 2 + .5,
        length: Math.random()
      });
    const fall = particle => {
      particle.x += particle.dx;
      particle.y += particle.dy;
      if(particle.x > width || particle.y > height){
        particle.x = Math.random() * width;
        particle.y = -20;
      }
    }
    let request;
    let lightning = 0;
    const draw = () => {
      request = requestAnimationFrame(draw);
      context.clearRect(0,0,width,height);
      const testValue = Math.random();
      if(testValue < .00069)
        lightning = 1;
      if(lightning > 0){
        const testValue2 = Math.random();
        if(testValue2 < .005) lightning = 1;
        const interpVal =
          lightning - .04 * (Math.random() * .05 + .25) * Math.exp(lightning);
        if(interpVal > 0)
          lightning = interpVal;
        else lightning = 0;
        context.fillStyle = `rgba(225,225,255,${lightning/1.5})`;
        context.fillRect(0,0,width,height);
      }
      for(let particle of particles){
        context.beginPath();
        context.moveTo(particle.x,particle.y);
        context.lineTo(
          particle.x + particle.length * particle.dx,
          particle.y + particle.length * particle.dy
        );
        context.stroke();
      }
      particles.forEach(fall);
    }
    requestAnimationFrame(draw);
    return () => cancelAnimationFrame(request);
  },[]);
  return (
    <ParallaxBanner layers={imageLayer} style={styles.parallaxContainer}>
      <div {...swipeHandlers}>
        <Grid wrap="nowrap" spacing={8} justify="center" style={styles.container} container direction="column">
          <Grid item>
            <Typography variant="h2" style={styles.header}>
              The Duncan Strauss Mysteries
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="space-around" alignItems="center">
              {(data.postData && data.postData.length > 1) ? (
                <Grid item>
                  <IconButton onClick={navLeft}>
                    <ArrowBackIos style={styles.navButton}/>
                  </IconButton>
                </Grid>
              ) : null}
              <Grid item>
                <BlogCard selectedPost={selectedDuncan} data={data} />
              </Grid>
              {(data.postData && data.postData.length > 1) ? (
                <Grid item>
                  <IconButton onClick={navRight}>
                    <ArrowForwardIos style={styles.navButton}/>
                  </IconButton>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ParallaxBanner>
  );
}
