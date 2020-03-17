import React from 'react';
import { useTrail, animated as a } from 'react-spring';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { themeSelect } from 'theme';

const [radius, padding] = themeSelect(['getBorderRadius', 'getPaperPadding']);

export const AboutMe = styled(Container)`
	display: flex;
	flex-direction: column;
	padding-top: 76px;
`;

export const Me = styled(Avatar)`
	height: 200px !important;
	width: 200px !important;
	margin-right: ${parseInt(padding, 10) - 8}px;
`;

export const Clothes = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	backdrop-filter: saturate(0.3) blur(0.25rem);
	border: 1px solid #69beef;
	border-radius: ${radius};
	padding: ${padding};
`;

export const Text = styled(Typography)`
	color: #69beef;
`;

export const FeatureList = styled(List)``;

const ListIcon = styled(a(ListItemIcon))`
	color: #69beef !important;
`;

const ListText = a(ListItemText);
export const Features = (props: {
	items: [React.FunctionComponent, string][];
}) => {
	const { items } = props;
	const trail = useTrail(items.length, {
		opacity: 1,
		transform: 'translate3d(0,0,0)',
		from: {
			opacity: 0,
			transform: 'translate3d(0,-10px,0)'
		},
		trail: 500,
		delay: 250
	});
	return (
		<>
			{trail.map((animStyles, index) => {
				const Icon = items[index][0];
				return (
					<ListItem key={items[index][1]}>
						<ListIcon style={animStyles}>
							<Icon />
						</ListIcon>
						<ListText style={animStyles}>
							<Text gutterBottom={false} variant='h4'>
								{items[index][1]}
							</Text>
						</ListText>
					</ListItem>
				);
			})}
		</>
	);
};
