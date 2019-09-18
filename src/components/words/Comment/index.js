import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Holder from 'components/words/Holder';

import { themeHook } from 'theme';

const useClasses = themeHook(
  ['getGrayText','getDarkText'],
  ([grayText,darkText]) => ({
    card:{
      marginTop:'8px',
      flexGrow:1
    },
    user:{
      color:grayText,
      fontSize:'24px',
      paddingLeft:'8px'
    },
    avatar:{
      width:'25px',
      height:'25px'
    },
    body:{
      color:darkText,
      fontSize:'28px'
    },
    bodyHolder:{
      padding:'14px'
    },
    depthMeter:{
      width:'2px',
      minWidth:'2px',
      top:0,
      bottom:0,
      marginLeft:'15px',
      marginRight:'15px',
      backgroundColor:'white'
    },
    holderHolder:{
      display:'flex',
      flexDirection:'row',
      alignItems:'stretch'
    }
  })
);

export default function Comment(props){
  const {
    user,
    comment:{
      body,
      depth,
      comments
    }
  } = props;
  const classes = useClasses(props);
  return (
    <React.Fragment>
      <Container className={classes.holderHolder}>
        {new Array(depth).fill(0).map((_,index) => (
          <div className={classes.depthMeter} key={`depthMeter#${index}`}/>
        ))}
        <Card className={classes.card}>
          <CardContent>
            <Holder direction="row" justify="flex-start">
              <Avatar src={user.image} />
              <Typography variant="h2" className={classes.user}>
                {user.username}
              </Typography>
            </Holder>
            <Holder className={classes.bodyHolder}>
              <Typography variant="body2" className={classes.body}>
                {body}
              </Typography>
            </Holder>
          </CardContent>
          {(depth < 6) ? (
            <CardActions>
              <Button size="small">Reply</Button>
            </CardActions>
          ) : null}
        </Card>
      </Container>
      {comments && comments.map((comment,index) => (
        <Comment comment={comment} user={comment.user} key={`comment#${index}Depth${comment.depth}`}/>
      ))}
    </React.Fragment>
  );
}
