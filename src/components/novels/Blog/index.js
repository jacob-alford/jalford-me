import React , { useState , useEffect } from 'react';
import {
  Container, Typography,
  Grid, Paper,
  FormControl, FormLabel,
  FormControlLabel, Radio,
  RadioGroup, InputBase,
  Button
 } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';

 import BlogBar from '../../paragraphs/BlogBar';
import BlogInline from '../../words/BlogListing/BlogInline';

import withPageFade from '../../bindings/wrappers/withPageFade';

import { blogCategories , blogSearchBy } from '../../../config';

import { StyledBlog } from './style.js';

import firebase from 'firebase';

const tempBlogData = [
  { header:"Foundation of Epistemology",
    body:"This post introduces the foundation of epistemology necessary for future posts. It will address information, concepts, and knowledge; the 'location' of knowledge; and the formation of priori, and of posteriori.",
    date:new Date("February 12, 2018"),
    url:"/"
  },
  { header:"Foundation of Epistemology",
    body:"This post introduces the foundation of epistemology necessary for future posts. It will address information, concepts, and knowledge; the 'location' of knowledge; and the formation of priori, and of posteriori.",
    date:new Date("February 12, 2018"),
    url:"/"
  },
  { header:"Foundation of Epistemology",
    body:"This post introduces the foundation of epistemology necessary for future posts. It will address information, concepts, and knowledge; the 'location' of knowledge; and the formation of priori, and of posteriori.",
    date:new Date("February 12, 2018"),
    url:"/"
  }
]

function Blog(props) {
  const [blogPosts,setBlogPosts] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState("philosophy");
  const [selectedSearchBy,setSelectedSearchBy] = useState("tags");
  const [searchToken,setSearchToken] = useState("");
  const { user , headerIsOpen } = props;
  useEffect(() => {
    setBlogPosts(tempBlogData);
    setTimeout(() => {

    },5000);
  },[blogPosts]);
  const handleCategoryUpdate = evt => {
    setSelectedCategory(evt.target.value);
  }
  const handleSearchByUpdate = evt => {
    setSelectedSearchBy(evt.target.value);
  }
  const handleSearchInput = evt => {
    console.log(evt.target.value);
    setSearchToken(evt.target.value);
  }
  return (
    <React.Fragment>
      <StyledBlog>
        <Typography className="blogTitle" variant="h2">
          Blog
        </Typography>
          <Grid style={{width:"100%"}}spacing={1} container justify="center" alignItems="center">
            <Grid item>
              <Paper className="filterCard">
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Category
                  </FormLabel>
                  <RadioGroup aria-label="Category" name="category" value={selectedCategory} onChange={handleCategoryUpdate}>
                    {blogCategories.map((category,index) => (
                      <FormControlLabel key={`CategoryFilter${index}`} value={category.toLowerCase()} control={<Radio color="secondary" />} label={category} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className="filterCard">
                <Grid container direction="column">
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Search by
                      </FormLabel>
                      <RadioGroup row aria-label="SearchBy" name="searchby" value={selectedSearchBy} onChange={handleSearchByUpdate}>
                        {blogSearchBy.map((filter,index) => (
                          <FormControlLabel key={`SearchBy${index}`} value={filter.toLowerCase()} control={<Radio color="primary"/>} label={filter} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Paper>
                      <Grid container alignItems="center" direction="row">
                        <Grid item>
                          <SearchIcon className="searchIcon"/>
                        </Grid>
                        <Grid item>
                          <InputBase onChange={handleSearchInput} placeholder="Search"/>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item className="textCenter">
                    <Button variant="contained" color="primary" className="searchButton">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        <Container>
          {blogPosts.map((blogPost,index) => (
            <BlogInline blogPost={blogPost} key={`blogPost${index}`}/>
          ))}
        </Container>
      </StyledBlog>
      <BlogBar headerIsOpen={headerIsOpen}/>
    </React.Fragment>
  );
}

export default withPageFade(Blog);
