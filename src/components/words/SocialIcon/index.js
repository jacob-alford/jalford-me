import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

import { StyledSocialIcon } from './style.js';

export default function SocialIcon(props) {
	const { children } = props;
	const childrenWithStyle = React.Children.map(children, child =>
		React.cloneElement(child, { className: 'icon' })
	);
	return (
		<StyledSocialIcon>
			<ButtonBase className='iconHolder' {...props}>
				{childrenWithStyle}
			</ButtonBase>
		</StyledSocialIcon>
	);
}
