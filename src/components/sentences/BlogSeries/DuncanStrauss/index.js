import React , { useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

import {
  Card, CardContent,
  Typography, Link,
  Grid, IconButton
} from '@material-ui/core/';
import { ArrowForwardIos , ArrowBackIos } from '@material-ui/icons';

import { ParallaxBanner } from 'react-scroll-parallax';

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
    background:'linear-gradient(#00d2ff,#3a7bd5)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent'
  }
}

const sampleBlogPost = {
  title:"Hello Ryan",
  body:"This is a nice body bro",
  date:new Date(),
  uid:"root"
}

// 94892796

export default function DuncanStrauss(props){
  const { post , navRight , navLeft } = props;
  const swipeHandlers = useSwipeable({
    onSwipedLeft:navLeft,
    onSwipedRight:navRight
  });
  const bgCanvas = React.useRef();
  const imageLayer = [
    { children: <canvas ref={bgCanvas} style={styles.canvas}/> , amount:.5 }
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
    let lightningCounter = 0;
    const draw = () => {
      request = requestAnimationFrame(draw);
      context.clearRect(0,0,width,height);
      const testValue = Math.random();
      if(testValue < .0005){
        lightning = 1;
        lightningCounter = 0;
      }
      if(lightning > 0){
        const interpVal =
          lightning - .15 * Math.random() * Math.exp(lightning);
        console.log(lightning);
        if(interpVal > 0)
          lightning = interpVal;
        else lightning = 0;
        context.fillStyle = `rgba(225,225,255,${lightning/1.5})`;
        context.fillRect(0,0,width,height);
        lightningCounter++;
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
        <Grid wrap="nowrap" justify="space-evenly" style={styles.container} container direction="column">
          <Grid item>
            <Typography variant="h2" style={styles.header}>
              The Duncan Strauss Mysteries
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <Grid item>
                <IconButton onClick={navLeft}>
                  <ArrowBackIos style={styles.navButton}/>
                </IconButton>
              </Grid>
              <Grid item>
                <BlogCard blogPost={post} />
              </Grid>
              <Grid item>
                <IconButton onClick={navRight}>
                  <ArrowForwardIos style={styles.navButton}/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ParallaxBanner>
  );
}
