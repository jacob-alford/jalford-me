import React from 'react';

import { Motion , spring } from 'react-motion';

import Header from '../../paragraphs/Header';

const styles = {
  container:{
    height:'50vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:'25px',
    background:'linear-gradient(to right, #56CCF2, #2F80ED)',
    MozBoxShadow:'inset 0 -10px 16px -10px rgba(11,11,11,.6)',
    WebkitBoxShadow:'inset 0 -10px 16px -10px rgba(11,11,11,.6)',
    boxShadow:'inset 0 -10px 16px -10px rgba(11,11,11,.6)'
  }
}

export default function Heading(props){
  const { headerIsOpen } = props;

  return (
    <Motion
      defaultStyle={{height:25,minHeight:135,paddingTop:25}}
      style={{
        height:(headerIsOpen) ?
            spring(25)
          : spring(0),
        minHeight:(headerIsOpen) ?
            spring(135)
          : spring(0),
        paddingTop:(headerIsOpen) ?
            spring(25)
          : spring(0)
        }}>
      {newStyles => {
        const { height , minHeight , paddingTop } = newStyles;
        return (
          <div
            style={{
              ...styles.container,
              height:`${height}vh`,
              minHeight:`${minHeight}px`,
              paddingTop:`${paddingTop}px`
          }}>
            <div>
              <Header headerIsOpen={headerIsOpen} />
            </div>
          </div>
        )}}
    </Motion>
  );
}
