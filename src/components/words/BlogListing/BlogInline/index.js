import React from 'react';
import PropTypes from 'prop-types';
import { Paper , Typography , Link } from '@material-ui/core/';

import { StyledBlogInline } from './style.js';

export default function BlogInline(props){
  const { blogPost } = props;
  return (
    <StyledBlogInline>
      <Paper>
        <Typography variant="h5" className="title" gutterBottom>
          {blogPost.header}
        </Typography>
        <Typography variant="body2" className="date" gutterBottom>
          {(blogPost.date !== undefined) ?
            blogPost.date.toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'})
          : null
          }
        </Typography>
        <Typography variant="body1" gutterBottom>
          {blogPost.body}
        </Typography>
        <Typography variant="body1">
          <Link href={blogPost.url} className="link">
            Read More
          </Link>
        </Typography>
      </Paper>
    </StyledBlogInline>
  );
}

BlogInline.propTypes = {
  blogPost:PropTypes.shape({
    header:PropTypes.string.isRequired,
    body:PropTypes.string,
    date:PropTypes.instanceOf(Date),
    url:PropTypes.string.isRequired
  })
}
