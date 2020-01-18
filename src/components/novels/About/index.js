import React from 'react';
import Markdown from 'react-markdown';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import Email from '@material-ui/icons/Email';

import SocialIcon from 'components/words/SocialIcon';
import Image from 'components/words/Image';
import Holder from 'components/words/Holder';
import LightDarkToggler from 'components/words/LightDarkToggler';

import useTLD from 'components/bindings/hooks/useTLD';

import aboutContactImage from 'assets/me/CUMP_jalford-me.jpg';

import { socialMedia } from 'config';

import withPageFade from 'components/bindings/wrappers/withPageFade';
import useTitleSize from 'components/bindings/hooks/useTitleSize';

import markdownConfig from 'helpers/blogParse.js';

import { themeHook } from 'theme';

const aboutText = `I love javascript; perhaps four degrees too much.  I made this site in React, and I love that too.

I'm a mathematician attending New Mexico State University, anxiously anticipating graduation
by the Spring of 2020.

I'm a pro photographer in vehicle photography and quite competent in portraiture.

I've sold cars, so watch out!

My favourite thing to do besides adopt UK idiosyncrasies is to write.
I'm a philosophy writer, and have started a new series 'The Duncan Strauss Mysteries.'  [Check 'em out!](/posts) 🙂
`;
const javascriptTranslation = `\`\`\`javascript
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

const useClasses = themeHook(
	['getMinorSpacing', 'getMajorSpacing'],
	([minorSpacing, majorSpacing]) => ({
		holder: {
			color: ({ tldState }) =>
				tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
			background: ({ tldState }) => (tldState === 'light' ? '#fff' : '#232323'),
			paddingTop: minorSpacing,
			paddingBottom: majorSpacing,
			marginBottom: minorSpacing,
			transition: 'background .5s, color .5s'
		},
		title: {
			textAlign: 'center'
		},
		togglerHolder: {
			width: '100%'
		}
	})
);

const styles = {
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: 'center right',
		boxShadow: '0px 0px 77px -32px rgba(0,0,0,0.75)'
	},
	imgContainer: {
		width: '100%',
		paddingBottom: '60%',
		lineHeight: '0px'
	}
};

function About(props) {
	const { h3: titleSize } = useTitleSize();
	const [tldState, toggleTld] = useTLD();
	const classes = useClasses({ tldState });
	return (
		<Container className={classes.holder}>
			<Holder
				className={classes.togglerHolder}
				justify='flex-end'
				direction='row'>
				<LightDarkToggler mode={tldState} toggle={toggleTld} />
			</Holder>
			<Image
				src={aboutContactImage}
				alt='me'
				imageStyles={styles.image}
				holderStyles={styles.imgContainer}
			/>
			<Typography
				paragraph
				variant='h2'
				className={classes.title}
				style={{ fontSize: titleSize }}>
				About
			</Typography>
			<Markdown renderers={markdownConfig} source={aboutText} />
			<Typography
				paragraph
				variant='h2'
				className={classes.title}
				style={{ fontSize: titleSize }}>
				Javascript Translation
			</Typography>
			<Markdown renderers={markdownConfig} source={javascriptTranslation} />
			<Typography
				paragraph
				variant='h2'
				className={classes.title}
				style={{ fontSize: titleSize }}>
				Output
			</Typography>
			<Markdown renderers={markdownConfig} source={output} />
			<Grid container justify='center' alignItems='center'>
				<Grid item>
					<SocialIcon
						onClick={() => (window.location.href = socialMedia.linkedIn.url)}>
						<Avatar
							alt='LinkedIn'
							src={socialMedia.linkedIn.img}
							style={{ filter: 'invert(1)' }}
						/>
					</SocialIcon>
				</Grid>
				<Grid item>
					<SocialIcon
						onClick={() =>
							(window.location.href = `mailto:${socialMedia.email}`)
						}>
						<Email />
					</SocialIcon>
				</Grid>
			</Grid>
		</Container>
	);
}

export default withPageFade(About);
