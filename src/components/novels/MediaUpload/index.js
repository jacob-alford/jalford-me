import React, { useState, useRef } from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';

import LightDarkToggler from 'components/words/LightDarkToggler';
import Holder from 'components/words/Holder';

import Category from '@material-ui/icons/Category';

import useTLD from 'components/bindings/hooks/useTLD';
import useTitleSize from 'components/bindings/hooks/useTitleSize';
import { themeHook } from 'theme';

const getBorderColor = tldState =>
	tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)';

const useClasses = themeHook(
	[
		'getDarkBackground',
		'getLightBackground',
		'getMajorSpacing',
		'getBorderRadius',
		'getMinorSpacing'
	],
	([darkBg, lightBg, majorSpacing, borderRadius, minorSpacing]) => ({
		photoUploadHolder: {
			background: ({ tldState }) => (tldState === 'light' ? lightBg : darkBg),
			textAlign: 'center',
			transition: 'background .5s, color .5s',
			width: '100vw',
			overflowX: 'hidden',
			paddingBottom: majorSpacing
		},
		title: {
			color: ({ tldState }) =>
				tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
			transition: 'color .5s'
		},
		togglerHolder: {
			width: '100%',
			paddingTop: '12px'
		},
		textBox: {
			color: ({ tldState }) =>
				tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
			borderBottom: ({ tldState }) => `solid 1px ${getBorderColor(tldState)}`,
			transition: 'background .5s, color .5s, border .5s'
		},
		textBoxHolder: {
			marginTop: majorSpacing,
			border: ({ tldState }) => `solid 1px ${getBorderColor(tldState)}`,
			padding: minorSpacing,
			width: '222px',
			position: 'relative',
			left: 'calc(50% - 130px)',
			borderRadius,
			transition: 'border .5s'
		},
		categoryIcon: {
			color: ({ tldState }) =>
				tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
			transition: 'color .5s',
			marginRight: '15px'
		},
		fileUpload: {
			marginTop: majorSpacing
		}
	})
);

export default function MediaUpload() {
	const [tldState, toggleTld] = useTLD();
	const classes = useClasses({ tldState });
	const { h2: fontSize } = useTitleSize();
	const [category, setCategory] = useState('');
	const formRef = useRef();
	const handleType = evt => setCategory(evt.target.value);
	const handleUpload = () => {};
	return (
		<Container className={classes.photoUploadHolder}>
			<Holder className={classes.togglerHolder} justify='flex-end' direction='row'>
				<LightDarkToggler mode={tldState} toggle={toggleTld} />
			</Holder>
			<Typography variant='h2' style={{ fontSize }} className={classes.title}>
				Image Upload
			</Typography>
			<Holder direction='row' className={classes.textBoxHolder}>
				<Category className={classes.categoryIcon} />
				<InputBase
					variant='outlined'
					label='Category'
					placeholder='Category'
					className={classes.textBox}
					value={category}
					onChange={handleType}
				/>
			</Holder>
			<Holder className={classes.fileUpload}>
				<input
					ref={formRef}
					type='file'
					accept='image/png, image/jpeg'
					name='photo'
					multiple
				/>
			</Holder>
		</Container>
	);
}
