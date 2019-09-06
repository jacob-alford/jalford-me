import React , { useState , useEffect , useReducer , useRef } from 'react';
import { useSprings , animated as a } from 'react-spring';
import { ParallaxBanner } from 'react-scroll-parallax';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import OpenWith from '@material-ui/icons/OpenWith';

import useColorAdapt from '../../../bindings/hooks/useColorAdapt';
import useRedirect from '../../../bindings/hooks/useRedirect';

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
    flexWrap:'nowrap',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    boxShadow:'inset 0px 0px 70px 0px rgba(0,0,0,.8)'
  },
  subContainer:{
    display:'flex',
    flexDirection:'column',
    flexWrap:'nowrap',
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    color:'#58E855',
    backgroundColor:'rgba(0,0,0,.5)',
    borderColor:'#58E855',
    transition:'color .4s border-color .4s'
  },
  colorCircle:{
    width:'50px',
    height:'50px',
    borderRadius:'26px',
    borderStyle:'solid',
    borderWidth:'1px',
    borderColor:'white',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    cursor:'grab',
    backgroundClip:'content-box',
    backgroundSize:'100% 100%',
    transition:'color .4s border-color .4s',
    touchAction:'none'
  },
  circleEphemeral:{
    opacity:.5
  },
  circleHolder:{
    height:'100%'
  },
  refresh:{
    cursor:'pointer',
    marginTop:'16px'
  },
  circleGroup:{
    position:'absolute',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  bgCanvas:{
    width:'100vw',
    height:'100vh'
  }
}

const randomGray = () => Math.random() * 255 | 0;
const randomColor = () => `rgba(${randomGray()},${randomGray()},${randomGray()},1)`;
const randomColorArr = () => [randomColor(),randomColor(),randomColor()];

const toHex = rgba => rgba.slice(5,-1).split(",")
                          .map(num => parseInt(num,10).toString(16))
                          .slice(0,-1).join("");
const toRGBA = (hex,alpha=1) => {
  let wrkHex;
  if(hex.includes("#")) wrkHex = hex.substring(1);
  else wrkHex = hex;
  const gInt = val => parseInt(val,16);
  let wRGB;
  if(wrkHex.length === 3)
    wRGB = [
      gInt(`${wrkHex[0]}${wrkHex[0]}`),
      gInt(`${wrkHex[1]}${wrkHex[1]}`),
      gInt(`${wrkHex[2]}${wrkHex[2]}`)
    ];
  else
   wRGB = [
    gInt(`${wrkHex[0]}${wrkHex[1]}`),
    gInt(`${wrkHex[2]}${wrkHex[3]}`),
    gInt(`${wrkHex[4]}${wrkHex[5]}`)
  ];
  return `rgba(${wRGB[0]},${wRGB[1]},${wRGB[2]},${alpha})`;
}
const isEqual = (arr1,arr2) => {
  for(let i=0;i<arr1.length;i++){
    if(arr1[i] !== arr2[i]) return false;
  }
  return true;
}

const ColorCircle = props => {
  const { color , bgColor , onDragStart , onTouchStart } = props;
  const textColor = useColorAdapt(toHex(color));
  const borderColor = useColorAdapt(toHex(bgColor));
  return (
    <div
      onDragStart={onDragStart}
      onTouchStart={onTouchStart}
      draggable
      style={{...styles.colorCircle,borderColor:borderColor,backgroundColor:color}}>
      <OpenWith style={{color:textColor}}/>
    </div>
  );
};

const getYTouchOffset = (touch1,touch2) => {
  if(touch2.clientY && touch1.clientY)
    return touch2.clientY - touch1.clientY;
}

const CircleHolder = props => {
  const { colorState , colorDispatch , setHasSolved } = props;

  const clientIOS = useRef(/(iPad|iPhone|iPod)/g.test(navigator.userAgent));
  const currentDrag = useRef(null);
  const isMoving = useRef(false);
  const initialTouch = useRef(null);
  const touchHandlers = useRef([React.createRef(),React.createRef(),React.createRef()]);

  const handleDragStart = (evt,visibleIndex) => {
    if(!getColorByVI(colorState,visibleIndex).ephemeral){
      colorDispatch({type:'toggleEphemeral',payload:{index:visibleIndex}});
      evt.dataTransfer.setData('ThanksFirefox','');
      currentDrag.current = visibleIndex;
    }
  }
  const handleTouchStart = (evt,visibleIndex) => {
    if(!getColorByVI(colorState,visibleIndex).ephemeral){
      colorDispatch({type:'toggleEphemeral',payload:{index:visibleIndex}});
      initialTouch.current = evt.changedTouches[0];
    }
  }
  const handleTouchMove = (evt,visibleIndex) => {
    const offset = getYTouchOffset(initialTouch.current,evt.changedTouches[0]);
    const swapWith = offset/100 | 0;
    if(swapWith >= 1){
      const swapStr = (visibleIndex === 0) ?
                      `01`
                    : (visibleIndex === 1) ?
                      `12`
                    : null;
      if(swapStr){
        colorDispatch({type:`swap${swapStr}`});
        initialTouch.current = evt.changedTouches[0];
      }
    }else if(swapWith <= -1){
      const swapStr = (visibleIndex === 1) ?
                      `01`
                    : (visibleIndex === 2) ?
                      `12`
                    : null;
      if(swapStr) {
        colorDispatch({type:`swap${swapStr}`});
        initialTouch.current = evt.changedTouches[0];
      }
    }
  }
  const handleDragEnd = visibleIndex => {
    if(getColorByVI(colorState,visibleIndex).ephemeral){
      colorDispatch({type:'toggleEphemeral',payload:{index:visibleIndex}});
      currentDrag.current = null;
      isMoving.current = false;
    }
  }
  const handleTouchEnd = (evt,visibleIndex) => {
    if(getColorByVI(colorState,visibleIndex).ephemeral){
      colorDispatch({type:'toggleEphemeral',payload:{index:visibleIndex}});
      initialTouch.current = null;
    }
  }
  const handleDragOver = (evt,dropVisibleIndex) => {
    const visibleIndex = currentDrag.current;
    if(typeof visibleIndex === 'number'
    && !Number.isNaN(visibleIndex)
    && typeof dropVisibleIndex === 'number'
    && !Number.isNaN(dropVisibleIndex)
    && visibleIndex !== dropVisibleIndex
    && isMoving.current === false
    ){
      isMoving.current = true;
      currentDrag.current = dropVisibleIndex;
      const string = [visibleIndex,dropVisibleIndex].sort((item1,item2) => item1 - item2 ).join("");
      colorDispatch({type:`swap${string}`});
    }
  }

  useEffect(() => {
    if(isEqual(getYs(colorState),[25,50,75]))
      setHasSolved(true);
    else
      setHasSolved(false);
  },[colorState,setHasSolved]);

  useEffect(() => {
    if(clientIOS.current === true){
      const touchers = touchHandlers.current;
      touchers.forEach(toucher => {
        toucher.current.addEventListener('touchmove',e => e.preventDefault(),{passive:false});
        toucher.current.addEventListener('touchstart',e => e.preventDefault(),{passive:false});
      });
      return () => {
        touchers.forEach(toucher => {
          toucher.current.removeEventListener('touchmove',e => e.preventDefault());
          toucher.current.removeEventListener('touchstart',e => e.preventDefault());
        });
      }
    }
  },[touchHandlers]);

  const circleSprings = useSprings(colorState.length, colorState.map(item => {
    return {
      y:item.y,
      config:{
        tension:200,
        friction:12
      }
    }
  }));

  return circleSprings.map((spring,index) => {
    const { ephemeral , visibleIndex , color } = colorState[index];
    const { y } = spring;
    return (
      <a.div
        style={(!ephemeral) ?
              {...styles.circleGroup,
                top:y.interpolate(newY => `calc(${newY}% - 26px)`)}
            : {...styles.circleGroup,
               ...styles.circleEphemeral,
                top:y.interpolate(newY => `calc(${newY}% - 26px`)}}
        ref={touchHandlers.current[index]}
        onDragEnter={evt => handleDragOver(evt,visibleIndex)}
        onDragEnd={() => handleDragEnd(visibleIndex)}
        onTouchEnd={evt => handleTouchEnd(evt,visibleIndex)}
        onTouchMove={evt => handleTouchMove(evt,visibleIndex)}
        onTouchCancel={evt => handleTouchEnd(evt,visibleIndex)}
        key={`circle${index}`}>
        <ColorCircle
          color={color}
          bgColor={getColors(colorState)[2]}
          onDragStart={evt => handleDragStart(evt,visibleIndex)}
          onTouchStart={evt => handleTouchStart(evt,visibleIndex)}/>
      </a.div>
    );
  });
}

const colorKey = randomColorArr();

const initialOrientation = [
  [50,25,75],[50,75,25],[25,75,50],[75,25,50],[75,50,25]
][Math.random() * 5 | 0];

const initialState = colorKey.map((key,index) => {
  return {
    index:index,
    color:key,
    visibleIndex:initialOrientation[index] / 25 - 1,
    y:initialOrientation[index],
    ephemeral:false
  }
});

const toggleEphemeral = (state,index) => {
  const copyArr = [...state];
  const item = copyArr.find(item => item.visibleIndex === index);
  copyArr[copyArr.indexOf(item)].ephemeral = !copyArr[copyArr.indexOf(item)].ephemeral;
  return copyArr;
}

const swapYs = (state,index1,index2) => {
  const copyArr = [...state];
  const item1 = copyArr.find(item => item.visibleIndex === index1);
  const item2 = copyArr.find(item => item.visibleIndex === index2);
  const { y:y1 , visibleIndex:v1 } = item1;
  const { y:y2 , visibleIndex:v2 } = item2;
  copyArr[copyArr.indexOf(item1)].y = y2;
  copyArr[copyArr.indexOf(item1)].visibleIndex = v2;
  copyArr[copyArr.indexOf(item2)].y = y1;
  copyArr[copyArr.indexOf(item2)].visibleIndex = v1;
  return copyArr;
}

const refreshColors = state => {
  return state.map(item => {
    return {
      ...item,
      color:randomColor()
    }
  });
}

const reducer = (state,action) => {
  switch(action.type){
    case 'swap01':
      return swapYs(state,0,1);
    case 'swap02':
      return swapYs(state,0,2);
    case 'swap12':
      return swapYs(state,1,2);
    case 'toggleEphemeral':
      return toggleEphemeral(state,action.payload.index);
    case 'resetColors':
      return refreshColors(state);
    default:
      throw new Error('Undefined action in reducer in PuzzleFeatured!');
  }
}

const getColors = state => state.map(item => item.color);
const getYs = state => state.map(item => item.y);
const getColorByVI = (state,VI) => state.find(item => item.visibleIndex === VI);

export default function PuzzleFeatured(props){
  const handleOnClick = useRedirect("/puzzles");

  let canvasElement = React.createRef();
  let canvasHolder = React.createRef();

  const [colorState,dispatchColorChange] = useReducer(reducer,initialState);

  const textColor = useColorAdapt(toHex(getColors(colorState)[1]));
  const [hasSolved,setHasSolved] = useState(false);

  const imageLayer = [
    { children:<canvas ref={canvasElement} style={styles.bgCanvas}/>, amount:.1 }
  ];

  const updateColors = () => {
    dispatchColorChange({type:'resetColors'});
  }

  useEffect(() => {
    const width = canvasHolder.current.clientWidth;
    const height = canvasHolder.current.clientHeight * 1.4;
    canvasElement.current.width = width;
    canvasElement.current.height = height;

    const context = canvasElement.current.getContext("2d");
    const gradient = context.createLinearGradient(0, 0, width, height);

    const length = getColors(colorState).length;
    getColors(colorState).forEach((color,index) => {
      gradient.addColorStop(index/length,color);
    });
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  },[canvasElement,canvasHolder,colorState]);

  return (
    <ParallaxBanner style={styles.banner} layers={imageLayer}>
      <div style={styles.container} ref={canvasHolder}>
        <div style={styles.subContainer}>
          <div>
            <Typography variant="h2" paragraph style={{color:textColor}}>
              Puzzles
            </Typography>
          </div>
          <div>
            <Button
              style={(hasSolved) ?
                styles.button
              : {color:toRGBA(textColor,.75),borderColor:toRGBA(textColor,.35)}}
              variant="outlined"
              disabled={!hasSolved}
              onClick={handleOnClick}>
              {(hasSolved) ? "Proceed to Puzzles" : "Solve to Proceed"}
            </Button>
          </div>
          <div>
            <Button onClick={updateColors} style={{color:textColor}}>
              Refresh Colors
            </Button>
          </div>
        </div>
        <div style={styles.circleHolder}>
          <CircleHolder setHasSolved={setHasSolved} colorState={colorState} colorDispatch={dispatchColorChange}/>
        </div>
      </div>
    </ParallaxBanner>
  );
}
