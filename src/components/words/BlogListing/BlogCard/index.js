import React from 'react';
import { withRouter } from 'react-router';

import {
  Card, CardContent,
  Typography, Link,
  CircularProgress, Grid
} from '@material-ui/core/';

const styles = {
  title:{
    fontWeight:'bold'
  },
  link:{
    color: '#6c757d',
    cursor: 'pointer'
  },
  date:{
    color: '#6c757d'
  },
  postCard:{
    width:'75vw',
    boxShadow:'0px 0px 70px 0px rgba(0,0,0,.8)'
  },
  error:{
    color:'#E84040',
    textAlign:'center'
  }
}

const mapData = (data,id) => {
  if(data.postData && data.postData.length > 0 && data.postData[id])
    return data.postData[id];
  else return false;
};

function BlogCard(props){
  const { data , selectedPost , history } = props;
  const getPost = () => mapData(data,selectedPost);
  const handleLinkRedirect = url => {
    history.push(url);
  }
  return (
    <Card style={styles.postCard}>
      {(data.isLoading) ? (
        <CardContent>
          <Grid style={{height:'150px'}} container direction="row" justify="center" alignItems="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </CardContent>
      ) : null}
      {(data.error && !data.isLoading) ? (
        <CardContent>
          <Grid style={{height:'150px'}} container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h5" style={styles.error}>
                {data.error.toString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      ) : null}
      {(getPost() && !data.isLoading && !data.error) ? (
        <CardContent>
          <Typography variant="h5" style={styles.title} gutterBottom>
            {getPost().title}
          </Typography>
          <Typography variant="body2" style={styles.date} gutterBottom>
            {(getPost().date !== undefined) ?
              new Date(getPost().date.toDate()).toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'})
            : null
            }
          </Typography>
          {(getPost().snippit) ? (
            <Typography variant="body1" gutterBottom>
              {getPost().snippit}
            </Typography>
          ) : null}
          <Typography variant="body1">
            <Link onClick={() => handleLinkRedirect(`/posts/view/${getPost().uid}`)} style={styles.link}>
              Read More
            </Link>
          </Typography>
        </CardContent>
      ) : null}
      {(!getPost() && !data.isLoading && !data.error) ? (
        <CardContent>
          <Grid style={{height:'150px'}} container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h5" style={styles.error}>
                No posts found!
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      ) : null}
    </Card>
  );
}

export default withRouter(BlogCard);
