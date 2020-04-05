import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

import useTLD from 'components/bindings/hooks/useTLD';
import useHoverHandler from 'components/bindings/hooks/useHoverHandler';

import { themeHook } from 'theme';

const useClasses = themeHook(
	[
		'getCardPadding',
		'getBorderRadius',
		'getDarkBackground',
		'getLightBackground',
		'getLightIcon',
		'getDarkIcon',
		'getMajorSpacing'
	],
	([cardPadding, borderRadius, darkBg, lightBg, lightIcon, darkIcon, majorSpacing]) => ({
		bar: {
			width: '96px',
			paddingLeft: cardPadding,
			paddingRight: cardPadding,
			borderRadius,
			background: ({ tldState }) => (tldState === 'light' ? darkBg : lightBg),
			transition: 'background .5s, color .5s',
			margin: majorSpacing
		},
		icon: {
			color: ({ tldState }) => (tldState === 'light' ? lightIcon : darkIcon),
			transition: 'background .5s, color .5s'
		}
	})
);

const getColor = (pane, item, tldState) =>
	pane === item
		? tldState === 'light'
			? '#fff'
			: '#232323'
		: tldState === 'light'
		? '#ababab'
		: '#898989';

export default function IconBar(props) {
	const { pane, setPhotos, setVideo } = props;
	const [tldState] = useTLD();
	const classes = useClasses({ tldState, pane });
	const photoHover = useHoverHandler({
		out: { color: getColor(pane, 'photos', tldState) },
		over: { color: tldState === 'light' ? '#fff' : '#232323' }
	});
	const videoHover = useHoverHandler({
		out: { color: getColor(pane, 'videos', tldState) },
		over: { color: tldState === 'light' ? '#fff' : '#232323' }
	});
	return (
		<div className={classes.bar}>
			<IconButton onClick={setPhotos}>
				<PhotoCamera className={classes.icon} {...photoHover} />
			</IconButton>
			<IconButton onClick={setVideo}>
				<Videocam className={classes.icon} {...videoHover} />
			</IconButton>
		</div>
	);
}
