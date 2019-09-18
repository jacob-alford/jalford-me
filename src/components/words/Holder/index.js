import React from 'react';

const resolveDir = dir =>
  (dir === 'col' || dir === 'column') ?
    'column'
  : 'row';
const resolveWrap = wrap =>
  (wrap) ?
    (typeof wrap === 'string') ?
      wrap
    : 'wrap'
  : 'nowrap';

const styles = {
  container:{
    display:'flex'
  }
}

export default function Holder(props){
  const {
    direction = 'column',
    justify = 'center',
    align = 'center',
    style,
    wrap = 'wrap',
    className
  } = props;
  return (
    <div
      className={className}
      style={{
        ...styles.container,
        ...style,
        justifyContent:justify,
        alignItems:align,
        flexWrap:resolveWrap(wrap),
        flexDirection:resolveDir(direction)
      }}>
      {props.children}
    </div>
  );
}
