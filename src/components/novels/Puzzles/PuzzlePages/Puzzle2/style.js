import { themeHook } from 'theme';

const useClasses = themeHook(
  ['getMajorSpacing'],
  ([majorSpacing]) => ({
    viewer:{
      width:'calc(90vw - 6px)',
      height:({headerIsOpen}) => (headerIsOpen) ? '40vh' : '60vh',
      marginBottom:majorSpacing,
      backgroundColor:'white',
      border:'rgba(0,0,0,.69) 3px solid',
      borderRadius:'8px'
    },
    puzzleHolder:{
      width:'100vw',
      backgroundColor:'#71EEB8'
    },
    title:{
      marginTop:majorSpacing,
      marginBottom:majorSpacing,
      fontWeight:'lighter',
      textAlign:'center'
    }
  })
);

export default useClasses;
