import { themeHook } from 'theme';

const useClasses = themeHook(
  ['getMajorSpacing','getMinorSpacing','getCardPadding'],
  ([majorSpacing,minorSpacing,cardPadding]) => ({
    viewer:{
      width:'calc(90vw - 6px)',
      height:({headerIsOpen}) => (headerIsOpen) ? '40vh' : '60vh',
      backgroundColor:'#f2eecb',
      border:'#7B5B40 3px solid',
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.72)',
      marginTop:majorSpacing
    },
    puzzleHolder:{
      width:'100vw',
      backgroundColor:'#71EEB8'
    },
    title:{
      marginBottom:majorSpacing,
      marginTop:minorSpacing,
      fontWeight:'lighter',
      textAlign:'center'
    },
    toolBarHolder:{
      width:'calc(90vw - 6px)'
    },
    bg1:{
      background:'#0E2A3B',
      border:'solid #3092cf 4px'
    },
    bg3:{
      background:'#253015',
      border:'solid #8eb455 4px'
    },
    bg2:{
      background:'#611D17',
      border:'solid #d9685e 4px'
    },
    bg4:{
      background:'#AE6329',
      border:'solid #d9935e 4px'
    },
    divider:{
      width:'75%',
      height:'2px',
      background:'white'
    },
    digit:{
      color:'rgba(0,0,0,.69)'
    },
    btnOperator:{
      fontSize:'2rem'
    },
    operatorHolder:{
      borderRadius:'8px',
      margin:minorSpacing
    },
    fieldHolder:{
      background:'white',
      padding:majorSpacing,
      borderRadius:'8px',
      maxWidth:'75vw',
      marginBottom:majorSpacing
    },
    hintGroup:{
      margin:'8px'
    },
    fieldTitle:{
      color:'rgba(0,0,0,.69)'
    },
    textField:{
      marginTop:minorSpacing,
      marginBottom:minorSpacing
    },
    vertSpacing:{
      marginTop:majorSpacing,
      marginBottom:majorSpacing
    },
    icon:{
      fontSize:'32px'
    },
    listHolder:{
      backgroundColor:'#f2eecb',
      borderRadius:'8px',
      padding:cardPadding,
      boxShadow:'0px 0px 77px -32px rgba(0,0,0,.75)',
      marginBottom:majorSpacing
    },
    sucessSpan:{
      color:'#357e37'
    },
    problemSpan:{
      color:'#d32f2f'
    }
  })
);

export default useClasses;
