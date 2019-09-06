import React from 'react';
import Markdown from 'react-markdown';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import Email from '@material-ui/icons/Email';

import SocialIcon from 'components/words/SocialIcon';
import Image from 'components/words/Image';

import { aboutContactImage , socialMedia } from 'config';

import withPageFade from 'components/bindings/wrappers/withPageFade';
import useTitleSize from 'components/bindings/hooks/useTitleSize';

import markdownConfig from 'helpers/blogParse.js';

const aboutText =
`I love javascript; perhaps four degrees too much.  I made this site in React, and I love that too.

I'm a mathematician attending New Mexico State University, anxiously anticipating graduation
by the Spring of 2020.

I'm a pro photographer in vehicle photography and quite competent in portraiture.

I've sold cars, so watch out!

My favourite thing to do besides adopt UK idiosyncrasies is to write.
I'm a philosophy writer, and have started a new series 'The Duncan Strauss Mysteries.'  [Check 'em out!](/posts) 🙂
`;
const javascriptTranslation =
`\`\`\`javascript
const Jacob = usePerson('me');
Jacob.loves('javascript').degree >= 4;

[Math,NMSU].reduce((has,new) => has && new.includes(Jacob),true) === true;

class Person{
  constructor(){
    this.likesPhotos = true;
  }
}
const you = new Person();
Jacob.takePhoto(you).quality === Infinity;

you |> Jacob.sellCarTo(#)
    |> #.isSuccess()
    |> (#) ? [Jacob,you].forEach(person => person.celebrate()) : false;

Jacob.words.oftenContains("superfluous u's") === true;
return (
  <React.Fragment>
    {Jacob.blogPosts.map(post => (
      <CoolBlogPost captivating url='/posts/view/\${post.url}' />
    ))}
  </React.Fragment>
);
\`\`\`
`;
const output = `
\`\`\`bash
Line  2: true
Line  4: true
Line 12: true
Line 15: Warning: contains tautology  no-logical-fallicies
Line 18: true
Line 22: Warning: Each child in an array or iterator should have a unique "key" prop.
\`\`\`
`;

const styles = {
  aboutText:{
    padding:'18px',
    marginBottom:'2rem'
  },
  title:{
    color:'rgba(0,0,0,.85)',
    textAlign:'center'
  }
}

function About(props){
  const { h3:titleSize } = useTitleSize();
  return (
    <Container fixed>
      <Image src={aboutContactImage} alt="me" />
      <Paper style={styles.aboutText} elevation={0}>
        <Typography paragraph variant="h2" style={{...styles.title,fontSize:titleSize}}>
          About
        </Typography>
        <Markdown renderers={markdownConfig} source={aboutText} />
        <Typography paragraph variant="h2" style={{...styles.title,fontSize:titleSize}}>
          Javascript Translation
        </Typography>
        <Markdown renderers={markdownConfig} source={javascriptTranslation} />
        <Typography paragraph variant="h2" style={{...styles.title,fontSize:titleSize}}>
          Output
        </Typography>
        <Markdown renderers={markdownConfig} source={output} />
      </Paper>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <SocialIcon onClick={() => window.location.href = socialMedia.linkedIn.url}>
            <Avatar alt="LinkedIn" src={socialMedia.linkedIn.img} style={{filter:"invert(1)"}}/>
          </SocialIcon>
        </Grid>
        <Grid item>
          <SocialIcon onClick={() => window.location.href = `mailto:${socialMedia.email}`}>
            <Email />
          </SocialIcon>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageFade(About);
