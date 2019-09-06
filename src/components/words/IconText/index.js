import React from 'react';
import Typography from '@material-ui/core/Typography';

import Container from 'components/words/Holder';

const styles = {
  item:{
    margin:'6px',
    marginRight:'8px',
    marginLeft:'8px',
    cursor:'pointer',
    userSelect:'none',
    WebkitTouchCallout:'none',
    WebkitUserSelect:'none'
  }
}

export default function TechListing(props){
  const { img , text , url } = props;
  const handleRedirect = () => window.location.href = url;
  return (
    <Container direction='row' style={styles.item}>
      <img src={img} width='32' height='32' alt={text}/>
      <Typography variant="h6" style={{color:'white'}} onClick={handleRedirect}>
        {text}
      </Typography>
    </Container>
  );
}
