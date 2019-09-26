import { themeHook } from 'theme';

const useClasses = themeHook(
  ['getMajorSpacing','getMinorSpacing','getCardPadding'],
  ([majorSpacing,minorSpacing,cardPadding]) => ({
    letterHolder:{
      padding:'24px',
      border:'solid #afafaf 4px',
      borderRadius:'8px',
      background:'rgba(0,0,0,.69)',
      margin:minorSpacing
    },
    operatorHolder:{
      borderRadius:'8px',
      margin:minorSpacing
    },
    bg1:{
      background:'#108284',
      border:'solid #2DE2E6 4px'
    },
    bg2:{
      background:'#a30023',
      border:'solid #FF3864 4px'
    },
    bg3:{
      background:'#8f3700',
      border:'solid #FF6C11 4px'
    },
    btnOperator:{
      fontSize:'2rem'
    },
    superHolder:{
      backgroundColor:"#FBEC5D",
      padding:majorSpacing,
      minHeight:'50vh'
    },
    divider:{
      width:'75%',
      height:'2px',
      background:'white'
    },
    vertSpacing:{
      marginTop:majorSpacing,
      marginBottom:majorSpacing
    },
    fieldHolder:{
      background:'white',
      padding:majorSpacing,
      borderRadius:'8px'
    },
    fieldTitle:{
      color:'rgba(0,0,0,.69)'
    },
    textField:{
      marginTop:minorSpacing,
      marginBottom:minorSpacing
    },
    hintGroup:{
      margin:'8px'
    },
    checkButton:{
      marginTop:minorSpacing
    },
    title:{
      marginBottom:majorSpacing,
      fontWeight:'lighter',
      textAlign:'center'
    }
  })
);

export default useClasses;
