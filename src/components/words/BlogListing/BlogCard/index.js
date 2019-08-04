import React from 'react';
import PropTypes from 'prop-types';
import { Card , CardContent , Typography , Link } from '@material-ui/core/';

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
    maxWidth:'75vw'
  }
}

export default function BlogCard(props){
  const { blogPost } = props;
  return (
    <Card style={styles.postCard}>
      <CardContent>
        <Typography variant="h5" style={styles.title} gutterBottom>
          {blogPost.title}
        </Typography>
        <Typography variant="body2" style={styles.date} gutterBottom>
          {(blogPost.date !== undefined) ?
            blogPost.date.toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'})
          : null
          }
        </Typography>
        <Typography variant="body1" gutterBottom>
          {blogPost.body}
        </Typography>
        <Typography variant="body1">
          <Link href={`/blog/view/${blogPost.uid}`} style={styles.link}>
            Read More
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

BlogCard.propTypes = {
  blogPost:PropTypes.shape({
    title:PropTypes.string.isRequired,
    body:PropTypes.string,
    date:PropTypes.instanceOf(Date),
    uid:PropTypes.string.isRequired
  })
}
