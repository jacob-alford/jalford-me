import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core/';


import { StyledImageSlider } from './style.js';

export default function ImageSlider(props){
  const [activeItem , setActiveItem] = useState(0);
  const { images } = props;
  useEffect(() => {
    setTimeout(() => {
      setActiveItem(( activeItem + 1 ) % images.length );
    }, 5000);
  });
  return (
    <StyledImageSlider>
      {images.map((image,index) => (
        <Grid key={`imageSlider#${index}`} container spacing={0} justify="center" className="imageContainer">
          <Grid item>
            <img src={image} alt={`imageSlider#${index}`}
              className={(index === activeItem) ?
                "visible image"
              : "hidden image"} />
          </Grid>
        </Grid>
      ))}
    </StyledImageSlider>
  );
}

ImageSlider.propTypes = {

}
