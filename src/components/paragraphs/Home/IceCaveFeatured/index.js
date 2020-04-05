import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Image from 'components/words/Image';

import icecavesImage from 'assets/photos/IceCaves_onHome.webp';
import icecavesButtHoleSurfers from 'assets/photos/IceCaves_onHome.jpg';

import useHoverHandlers from 'components/bindings/hooks/useHoverHandler';
import useRedirect from 'components/bindings/hooks/useRedirect';

const styles = {
	banner: {
		marginTop: '8px',
		height: '100vh',
		maxHeight: '500px'
	},
	bannerHover: {
		marginTop: '8px',
		height: '100vh',
		maxHeight: '500px'
	},
	children: {
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		transition: 'box-shadow .5s',
		boxShadow: 'inset 0px 0px 0px 0px rgba(95,180,237,1)'
	},
	childrenHover: {
		boxShadow: 'inset 0px 0px 70px 0px rgba(95,180,237,1)'
	},
	button: {
		color: '#5FB4ED',
		backgroundColor: 'rgba(0,0,0,.5)',
		borderColor: 'white',
		transition: 'background-color .4s'
	},
	buttonHover: {
		backgroundColor: 'rgba(0,0,0,.2)'
	},
	sweetText: {
		fontWeight: 'bold',
		background: '-webkit-linear-gradient(#CDE0F0, #9AC1E0)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		boxShadow: '0px 4px 59px -25px rgba(0,0,0,.8)'
	},
	divider: {
		backgroundColor: 'white',
		width: '50vw',
		marginTop: '25px',
		marginBottom: '25px'
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: 'right center'
	}
};

const imageLayer = [
	{
		children: (
			<Image
				src={icecavesImage}
				naked
				fallbackSrc={icecavesButtHoleSurfers}
				imageStyles={styles.image}
				alt='The Beautiful Ice Cave'
			/>
		),
		amount: 0.1
	}
];

export default function IceCaveFeatured(props) {
	const hoverHandlers = useHoverHandlers({
		base: styles.children,
		over: styles.childrenHover
	});
	const btnHoverHandlers = useHoverHandlers({
		base: styles.button,
		over: styles.buttonHover
	});
	const btnClick = useRedirect('https://www.icecaves.com/');

	return (
		<ParallaxBanner style={styles.banner} layers={imageLayer}>
			<div {...hoverHandlers}>
				<Typography variant='h2' style={styles.sweetText}>
					Ice Cave and Bandera Volcano
				</Typography>
				<Divider style={styles.divider} light component='div' />
				<Button {...btnHoverHandlers} variant='outlined' onClick={btnClick}>
					Check it out
				</Button>
			</div>
		</ParallaxBanner>
	);
}
