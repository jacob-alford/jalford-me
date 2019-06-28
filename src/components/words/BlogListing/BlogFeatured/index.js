import React from 'react';
import PropTypes from 'prop-types';
import { Card , CardContent , Typography , Link } from '@material-ui/core/';

import { StyledBlogFeatured } from './style.js';

export default function BlogFeatured(props){
  const { blogPost } = props;
  return (
    <StyledBlogFeatured>
      <Card>
        <CardContent>
          <Typography variant="h3" className="title" gutterBottom>
            {blogPost.header}
          </Typography>
          <Typography variant="h5" gutterBottom>
            <span className="author">
              {(blogPost.author !== undefined) ?
                `by ${blogPost.author} | ` : null
              }
            </span>
            <span className="date">
              {(blogPost.date !== undefined) ?
                blogPost.date.toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'})
              : null
              }
            </span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            {blogPost.body}
          </Typography>
          <Typography variant="body1">
            <Link href={blogPost.url} className="link">
              Read More
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </StyledBlogFeatured>
  );
}

BlogFeatured.propTypes = {
  blogPost:PropTypes.shape({
    header:PropTypes.string.isRequired,
    author:PropTypes.string,
    body:PropTypes.string,
    date:PropTypes.instanceOf(Date),
    url:PropTypes.string.isRequired
  })
}
