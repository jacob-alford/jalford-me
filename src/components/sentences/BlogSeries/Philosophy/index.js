import React , { useEffect , useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Grid, IconButton , Typography } from '@material-ui/core/';
import { ArrowForwardIos , ArrowBackIos } from '@material-ui/icons';

import { ParallaxBanner } from 'react-scroll-parallax';

import useSeriesConnect from '../../../bindings/hooks/useSeriesConnect';

import BlogCard from '../../../words/BlogListing/BlogCard';


// 94892796

export default function Philosophy(props){
  const data = useSeriesConnect("Philosophy");
  const [selectedPhi,setSelectedPhi] = useState(0);
  const { minHeight = 1000 , widthStr = '100vw' , heightStr = '75vh' } = props;
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
      minHeight:`${minHeight}px`,
      height:heightStr
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
      background:'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
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
  const imageLayer = [
    { children: <canvas ref={bgCanvas} style={styles.canvas}/> , amount:.1 }
  ];

  useEffect(() => {
    const context = bgCanvas.current.getContext("2d");
    bgCanvas.current.width = window.innerWidth;
    bgCanvas.current.height = Math.max(minHeight,window.innerHeight * (parseInt(heightStr,10)/100));
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

    const toRGB = (...hexes) => hexes.map(hex => [
      parseInt(`${hex[1]}${hex[2]}`,16),
      parseInt(`${hex[3]}${hex[4]}`,16),
      parseInt(`${hex[5]}${hex[6]}`,16)
    ]);
    const colorList = [
      '#5DE8E5','#F44D9B','#E9275B','#392270',
      '#01FFC3','#00A9FE','#28CF75','#FFE3F1',
      '#80FF00','#F89899','#5AFFFF','#FC6B68'
    ];
    const neonColors = [...toRGB(...colorList)];
    const randomColor = () => neonColors[Math.floor(Math.random() * neonColors.length)];
    const colorString = (arr,alpha) => `rgba(${arr[0]},${arr[1]},${arr[2]},${alpha})`;

    class randomBokehBall{
      constructor(width,height,index){
        this.index = index;
        this.radius = Math.random() * (width / 3) + (width / 20);
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.fadeRate = .01;
        this.color = randomColor();
        this.lingerDuration = Math.floor(Math.random() * 1380) + 90;
        this.currentLinger = 0;
        this.maxOpacity = Math.random() * .4 + .15;
        this.currentFade = 0;
        this.moveDirectionX = (Math.random() < .5) ? -1 : 1;
        this.moveDirectionY = (Math.random() < .5) ? -1 : 1;
        this.moveRateX = Math.random() * .6;
        this.moveRateY = Math.random() * .6;
      }
    }

    const progressBall = (ball,bokeh) => {
      /* Life cycle has ended, begin anew */
      if(ball.currentFade === 0 && ball.currentLinger >= ball.lingerDuration){
        bokeh.splice(ball.index,1,new randomBokehBall(width,height,ball.index));
        ball = null;
      }else{
        ball.x += ball.moveDirectionX * ball.moveRateX;
        ball.y += ball.moveDirectionY * ball.moveRateY;
        /* Fade / Grow In */
        if(ball.currentFade < ball.maxOpacity && ball.currentLinger < ball.lingerDuration){
          if(ball.currentFade + ball.fadeRate < ball.maxOpacity)
            ball.currentFade += ball.fadeRate;
          else ball.currentFade = ball.maxOpacity;
        }else{
          /* Persist for fixed time */
          if(ball.currentLinger < ball.lingerDuration){
            ball.currentLinger++;
          /* Fade Out */
          }else{
            if(ball.currentFade - ball.fadeRate > 0)
              ball.currentFade -= ball.fadeRate;
            else ball.currentFade = 0;
          }
        }
      }
    }

    const bokeh = [];
    let counter = 0;
    let breakpointStagger = 250;
    const maxBokeh = 32;

    let request;
    const draw = () => {
      request = requestAnimationFrame(draw);
      updateWidthHeight();
      if(counter > breakpointStagger && bokeh.length <= maxBokeh){
        bokeh.push(new randomBokehBall(width,height,bokeh.length));
        breakpointStagger = Math.random() * 475 + 36;
        counter = 0;
      }
      context.clearRect(0,0,width,height);
      for(let ball of bokeh){
        context.fillStyle = colorString(ball.color,ball.currentFade);
        context.beginPath();
        context.ellipse(
          ball.x,ball.y,
          ball.radius * h2w, ball.radius * w2h,
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
  },[heightStr,minHeight]);
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
