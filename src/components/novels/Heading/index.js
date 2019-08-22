import React from 'react';

import { Motion , spring } from 'react-motion';

import Header from '../../paragraphs/Header';

const styles = {
  container:{
    height:'50vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'linear-gradient(to right, #56CCF2, #2F80ED)',
    MozBoxShadow:'inset 0 -10px 16px -10px rgba(11,11,11,.6)',
    WebkitBoxShadow:'inset 0 -10px 16px -10px rgba(11,11,11,.6)',
    boxShadow:'inset 0 -10px 16px -10px rgba(11,11,11,.6)'
  }
}

const paddingTop = 48; // px
const minHeight = 135; // px
const height = 25; // vh

export default function Heading(props){
  const { headerIsOpen } = props;

  return (
    <Motion
      defaultStyle={{height:height,minHeight:minHeight,paddingTop:paddingTop}}
      style={{
        height:(headerIsOpen) ?
            spring(height)
          : spring(0),
        minHeight:(headerIsOpen) ?
            spring(minHeight)
          : spring(0),
        paddingTop:(headerIsOpen) ?
            spring(paddingTop)
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
