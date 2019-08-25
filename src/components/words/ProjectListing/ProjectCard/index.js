import React from 'react';
import useReactRouter from 'use-react-router';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core/';

import { StyledProjectCard } from './style.js';

export default function ProjectCard(props){
  const { history } = useReactRouter();
  const { projectDetails } = props;
  const handleClick = url => {
    if(url.includes("http")) window.location.href = url;
    else history.push(url);
  }
  return (
    <StyledProjectCard>
      <Card className="card">
        <CardActionArea>
          <CardMedia className="image" image={projectDetails.image} title={projectDetails.imageTitle} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {projectDetails.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {projectDetails.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {projectDetails.actions.map((action,index) => (
            <Button key={`Project${index}`} variant={action.type} size="small" style={action.style} color={action.color} onClick={() => handleClick(action.url)}>
              {action.text}
            </Button>
          ))}
        </CardActions>
      </Card>
    </StyledProjectCard>
  );
}

ProjectCard.propTypes = {
  projectDetails:PropTypes.shape({
    title:PropTypes.string.isRequired,
    body:PropTypes.string,
    image:PropTypes.string,
    actions:PropTypes.arrayOf(PropTypes.shape({
      type:PropTypes.oneOf(['text','outlined','contained']),
      style:PropTypes.object,
      color:PropTypes.oneOf(['default','inherit','primary','secondary']),
      text:PropTypes.string,
      url:PropTypes.string
    }))
  })
}
