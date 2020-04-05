import React from 'react';
import Typography from '@material-ui/core/Typography';

import PhotoGrid from '../PhotoGrid.js';

import { themeHook } from 'theme';

import useTLD from 'components/bindings/hooks/useTLD';

import Holder from 'components/words/Holder';

const sections = [
	{
		title: 'people',
		photos: [
			{
				url:
					'https://images.unsplash.com/photo-1571896625889-b1e41a9051b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				width: 1350
			},
			{
				url:
					'https://images.unsplash.com/photo-1571907483086-3c0ea40cc16d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				width: 1350
			},
			{
				url:
					'https://images.unsplash.com/photo-1571926819823-de3c37241e89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80',
				width: 1266
			},
			{
				url:
					'https://images.unsplash.com/photo-1571859939884-50b51d4cbc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
				width: 800
			},
			{
				url:
					'https://images.unsplash.com/photo-1571859939884-50b51d4cbc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
				width: 800
			},
			{
				url:
					'https://images.unsplash.com/photo-1571859939884-50b51d4cbc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
				width: 800
			}
		]
	},
	{
		title: 'places',
		photos: [
			{
				url:
					'https://images.unsplash.com/photo-1571896625889-b1e41a9051b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				width: 1350
			},
			{
				url:
					'https://images.unsplash.com/photo-1571907483086-3c0ea40cc16d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				width: 1350
			},
			{
				url:
					'https://images.unsplash.com/photo-1571926819823-de3c37241e89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80',
				width: 1266
			}
		]
	},
	{
		title: 'butts',
		photos: [
			{
				url:
					'https://images.unsplash.com/photo-1571896625889-b1e41a9051b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				width: 1350
			},
			{
				url:
					'https://images.unsplash.com/photo-1571907483086-3c0ea40cc16d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				width: 1350
			},
			{
				url:
					'https://images.unsplash.com/photo-1571926819823-de3c37241e89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80',
				width: 1266
			},
			{
				url:
					'https://images.unsplash.com/photo-1571859939884-50b51d4cbc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
				width: 800
			}
		]
	}
];

const useClasses = themeHook({
	sectionHolder: {
		opacity: ({ active }) => (active ? 1 : 0.25),
		transition: 'opacity .5s'
	},
	photosHolder: {},
	title: {
		color: ({ tldState }) =>
			tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
		fontWeight: 'bold',
		transition: 'color .5s'
	},
	subtitle: {
		color: ({ tldState }) =>
			tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
		fontWeight: 'lighter',
		transition: 'color .5s'
	}
});

export default function Photos(props) {
	const { title, width, active } = props;
	const [tldState] = useTLD();
	const classes = useClasses({ width, tldState, active });
	return (
		<Holder direction='row' className={classes.sectionHolder}>
			<Typography variant='h3' paragraph className={classes.title}>
				{title}
			</Typography>
			{sections.map(section => (
				<div key={section.title} className={classes.photosHolder}>
					<Typography variant='h3' paragraph className={classes.subtitle}>
						{section.title}
					</Typography>
					<PhotoGrid photos={section.photos} />
				</div>
			))}
		</Holder>
	);
}
