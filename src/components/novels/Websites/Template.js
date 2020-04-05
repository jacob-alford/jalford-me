import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';

import LightDarkToggler from 'components/words/LightDarkToggler';
import Image from 'components/words/Image';
import Container from 'components/words/Holder';
import LiveDemo from 'components/words/ArrowLink';

import { themeHook } from 'theme';

import useTitleSize from 'components/bindings/hooks/useTitleSize';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';

import useTLD from 'components/bindings/hooks/useTLD';

const getLightModeColor = featured => (featured ? '#fff' : '#223');
const getDarkModeColor = featured => (featured ? '#fff' : '#eee');
const getColor = (featured, tldState) =>
	tldState === 'light' ? getLightModeColor(featured) : getDarkModeColor(featured);
const getLightModeBgColor = featured => (featured ? '#232323' : '#fefeff');
const getDarkModeBgColor = featured => (featured ? '#494949' : '#232323');
const getBgColor = (featured, tldState) =>
	tldState === 'light' ? getLightModeBgColor(featured) : getDarkModeBgColor(featured);

const useClasses = themeHook(['getGutter', 'getMajorSpacing'], ([gutter, spacing]) => ({
	title: {
		textAlign: 'center',
		color: ({ featured, tldState }) => getColor(featured, tldState),
		fontWeight: 'bold',
		marginTop: spacing,
		transition: 'color .5s'
	},
	subtitle: {
		textAlign: 'center',
		color: ({ featured, tldState }) => getColor(featured, tldState),
		transition: 'color .5s'
	},
	superContainer: {
		width: '100%',
		minHeight: '100vh',
		backgroundColor: ({ featured, tldState }) => getBgColor(featured, tldState),
		transition: 'background .5s'
	},
	image: {
		width: '85vw',
		maxWidth: '752px',
		cursor: 'pointer'
	},
	imageHolder: {
		overflowY: 'hidden',
		marginTop: '96px',
		boxShadow: '0px 0px 77px -32px rgba(0,0,0,.75)'
	},
	itemContainer: {
		padding: '14px',
		borderRadius: '5px',
		backgroundColor: 'black'
	},
	button: {
		marginBottom: gutter,
		fontSize: '1.25rem',
		color: '#3af'
	},
	date: {
		fontWeight: 'lighter',
		color: ({ featured, tldState }) => getColor(featured, tldState),
		marginTop: gutter,
		marginBottom: gutter,
		transition: 'color .5s'
	},
	togglerHolder: {
		width: '100%'
	}
}));

const resolveDirection = tooSmall => (tooSmall ? 'col' : 'row');

export default function TemplateWebsite(props) {
	const { heading, tagline, action, techRP, image, year, video } = props;
	const { h2: titleSize, h5: captionSize } = useTitleSize();
	const [tldState, toggleTld] = useTLD();
	const screenTooSmall = useMediaQuery('(max-width:450px)');
	const tooSmall4Img = useMediaQuery('(max-width:600px)');
	const classes = useClasses({ ...props, tldState });
	const history = useHistory();
	const handleImgRedirect = useCallback(() => {
		if ((image && image.href.includes('http')) || (video && video.href.includes('http')))
			window.location.href = image.href;
		else history.push((image && image.href) || (video && video.href));
	}, [image, video, history]);
	return (
		<React.Fragment>
			<Container
				direction='col'
				className={classes.superContainer}
				wrap='noWrap'
				justifyContent={tooSmall4Img ? 'space-around' : 'center'}>
				<Container className={classes.togglerHolder} justify='flex-end' direction='row'>
					<LightDarkToggler mode={tldState} toggle={toggleTld} />
				</Container>
				<Container direction='col'>
					<Container direction='col'>
						<Typography
							paragraph
							variant='h2'
							className={classes.title}
							style={{ fontSize: titleSize }}>
							{heading}
						</Typography>
						<Typography
							paragraph
							variant='body2'
							className={classes.subtitle}
							style={{ fontSize: captionSize }}>
							{tagline}
						</Typography>
					</Container>
					{!action.disabled ? (
						<Container direction='row' justify='space-around' className={classes.button}>
							<LiveDemo text={action.text} href={action.href} />
						</Container>
					) : null}
					<Container
						direction={resolveDirection(screenTooSmall)}
						justify='space-between'
						className={classes.itemContainer}>
						{techRP()}
					</Container>
					{year ? (
						<Container>
							<Typography variant='h4' className={classes.date}>
								{year}
							</Typography>
						</Container>
					) : null}
				</Container>
				{image ? (
					<Container
						justify='flex-start'
						className={classes.imageHolder}
						style={{ marginBottom: tooSmall4Img ? '0px' : '96px' }}>
						<Image
							src={image.source}
							fallbackSrc={image.altSource}
							naked
							scrollFade
							onClick={handleImgRedirect}
							className={classes.image}
							imageStyles={{
								width: tooSmall4Img ? '100vw' : '69vw'
							}}
						/>
					</Container>
				) : null}
				{video ? (
					<Container
						justify='flex-start'
						className={classes.imageHolder}
						style={{ marginBottom: tooSmall4Img ? '0px' : '96px' }}>
						<video
							src={video.source}
							autoPlay
							loop
							className={classes.image}
							style={{
								width: tooSmall4Img ? '100vw' : '69vw'
							}}
						/>
					</Container>
				) : null}
			</Container>
		</React.Fragment>
	);
}
