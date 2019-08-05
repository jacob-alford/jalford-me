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
    background: 'linear-gradient(to bottom, #000C40,#F0F2F0)'
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
    background:'linear-gradient(#C33764, #1D2671)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent'
  }
}

// 94892796

export default function Philosophy(props){
  const data = useSeriesConnect("Duncan");
  const [selectedPhi,setSelectedPhi] = useState(0);
  const { minHeight = 1000 , widthStr = '100vw' } = props;
  const styles = {
    canvas:{
      position:"absolute",
      left:"0px",
      top:"0px",
      width:'100%',
      height:'100%',
      background: 'linear-gradient(to bottom, #000C40,#F0F2F0)'
    },
    parallaxContainer:{
      width:widthStr,
      minHeight:`${minHeight}px`
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
      background:'linear-gradient(#C33764, #1D2671)',
      WebkitBackgroundClip:'text',
      WebkitTextFillColor:'transparent'
    }
  }

  const navRight = () => {
    if(data.postData && data.postData.length > 0)
      setSelectedPhi((selectedPhi + 1) % data.postData.length);
  }
  const navLeft = () => {
    if(data.postData && data.postData.length > 0)
      setSelectedPhi((selectedPhi - 1 >= 0) ? selectedPhi - 1 : data.postData.length - 1);
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft:navLeft,
    onSwipedRight:navRight
  });

  const bgCanvas = React.useRef();
  const canvasParent = React.useRef();
  const imageLayer = [
    { children: <canvas ref={bgCanvas} style={styles.canvas}/> , amount:.1 }
  ];

  useEffect(() => {
    const context = bgCanvas.current.getContext("2d");
    bgCanvas.current.width = window.innerWidth;
    bgCanvas.current.height = Math.max(minHeight,window.innerHeight * .75);
    let width = bgCanvas.current.width;
    let height = bgCanvas.current.height;
    let w2h = (height > width) ? height/width : (height === width) ? 1 : width/height;
    let h2w = (width > height) ? width/height : (height === width) ? 1 : height/width;
    const updateWidthHeight = () => {
      if(bgCanvas.current.width !== window.innerWidth || bgCanvas.current.height !== window.innerHeight * .75){
        bgCanvas.current.width = window.innerWidth;
        bgCanvas.current.height = Math.max(minHeight,window.innerHeight * .75);
        width = bgCanvas.current.width;
        height = bgCanvas.current.height;
        w2h = (height > width) ? height/width : (height === width) ? 1 : width/height;
        h2w = (width > height) ? width/height : (height === width) ? 1 : height/width;
      }
    }

    const randomGray = () => Math.floor(Math.random() * 255 + 175);
    const randomColor = () => [randomGray(),randomGray(),randomGray()];
    const colorString = (arr,alpha) => `rgba(${arr[0]},${arr[1]},${arr[2]},${alpha})`;

    class randomBokehBall{
      constructor(width,height,index){
        this.index = index;
        this.maxRadius = Math.random() * (width / 5) + (width / 48);
        this.currentRadius = Math.random() * (width / 8) + (width / 55);
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.growRate = Math.random() * .05 + .0125;
        this.decayRate = Math.random() * .004 + .0122;
        this.fadeRate = .005;
        this.color = randomColor();
        this.lingerDuration = Math.floor(Math.random() * 1000);
        this.currentLinger = 0;
        this.maxOpacity = Math.random() * .3 + .05;
        this.currentFade = 0;
      }
    }

    const progressBall = (ball,bokeh) => {
      /* Progress Fade */
      // -- started to grow
      if(ball.currentLinger === 0){
        if(ball.currentFade + ball.fadeRate < ball.maxOpacity)
          ball.currentFade += ball.fadeRate;
        else ball.currentFade = ball.maxOpacity;
      // -- started to shrink
      }else if(ball.currentRadius !== ball.maxRadius && ball.currentLinger >= ball.lingerDuration){
        if(ball.currentFade - ball.fadeRate > 0)
          ball.currentFade -= ball.fadeRate;
        else ball.currentFade = 0;
      }
      /* Progress Size */
      if(ball.currentRadius < ball.maxRadius && ball.currentLinger === 0){
        if(ball.currentRadius + ball.growRate < ball.maxRadius)
          ball.currentRadius += ball.growRate;
        else ball.currentRadius = ball.maxRadius;
      }else{
        if(ball.currentLinger < ball.lingerDuration)
          ball.currentLinger++;
        else{
          if(ball.currentRadius - ball.decayRate > 0)
            ball.currentRadius -= ball.decayRate;
          else bokeh.splice(ball.index,1,new randomBokehBall(width,height,ball.index));
        }
      }
    }

    const bokeh = [];
    let counter = 0;
    let breakpointStagger = 300;
    const maxBokeh = 89;
    bokeh.push(new randomBokehBall(width,height,0));

    let request;
    const draw = () => {
      request = requestAnimationFrame(draw);
      updateWidthHeight();
      if(counter > breakpointStagger && bokeh.length <= maxBokeh){
        bokeh.push(new randomBokehBall(width,height,bokeh.length - 1));
        breakpointStagger = Math.random() * 100 + 36;
        counter = 0;
      }
      context.clearRect(0,0,width,height);
      for(let ball of bokeh){
        context.fillStyle = colorString(ball.color,ball.currentFade);
        context.beginPath();
        context.ellipse(
          ball.x,ball.y,
          ball.currentRadius * h2w, ball.currentRadius * w2h,
          0, 0, 2 * Math.PI
        );
        context.fill();
        progressBall(ball,bokeh);
      }
      if(counter <= breakpointStagger)
        counter++;
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
              Philosophy
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
                <BlogCard selectedPost={selectedPhi} data={data} />
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
