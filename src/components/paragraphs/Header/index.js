import React from 'react';
import { useSpring, animated as a } from 'react-spring';

import Typography from '@material-ui/core/Typography';

import NavBar from 'components/sentences/NavBar';

import { navItems } from 'config';

import { themeHook } from 'theme';

const useClasses = themeHook({
	title: {
		fontWeight: 'bold',
		fontSize: '3.5rem',
		textAlign: 'center',
		color: 'black'
	},
	image: {
		width: '350px'
	},
	holder: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	colorBlue: {
		color: '#69beef'
	},
	colorBlueGray: {
		color: '#212832'
	},
	colorGray: {
		color: '#262626'
	}
});

const getScaleString = headerIsOpen => {
	const scale = headerIsOpen ? 1 : 0;
	return `scale3d(${scale},${scale},${scale})`;
};

export default function Header(props) {
	const { headerIsOpen } = props;
	const classes = useClasses();
	const interStyles = useSpring({
		opacity: headerIsOpen ? 1 : 0,
		transform: getScaleString(headerIsOpen),
		from: {
			transform: getScaleString(false)
		}
	});
	return (
		<a.div style={interStyles} className={classes.holder}>
			<Typography variant='h1' className={classes.title} paragraph>
				<span className={classes.colorBlueGray}>j</span>
				<span className={classes.colorBlue}>a</span>
				<span className={classes.colorGray}>lford</span>
			</Typography>
			<NavBar navList={navItems} />
		</a.div>
	);
}
