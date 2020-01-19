import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		maxWidth: '345px'
	},
	image: {
		height: '140px'
	}
};

export default function ProjectCard(props) {
	const history = useHistory();
	const { projectDetails } = props;
	const handleClick = url => {
		if (url.includes('http')) window.location.href = url;
		else history.push(url);
	};
	return (
		<Card style={styles.card}>
			<CardActionArea>
				<CardMedia
					style={styles.media}
					image={projectDetails.image}
					title={projectDetails.imageTitle}
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{projectDetails.title}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						{projectDetails.body}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{projectDetails.actions.map((action, index) => (
					<Button
						key={`Project${index}`}
						variant={action.type}
						size='small'
						style={action.style}
						color={action.color}
						onClick={() => handleClick(action.url)}>
						{action.text}
					</Button>
				))}
			</CardActions>
		</Card>
	);
}

ProjectCard.propTypes = {
	projectDetails: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string,
		image: PropTypes.string,
		actions: PropTypes.arrayOf(
			PropTypes.shape({
				type: PropTypes.oneOf(['text', 'outlined', 'contained']),
				style: PropTypes.object,
				color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
				text: PropTypes.string,
				url: PropTypes.string
			})
		)
	})
};
