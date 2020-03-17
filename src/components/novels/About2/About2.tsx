import React from 'react';
import CodeIcon from '@material-ui/icons/Code';
import FunctionsIcon from '@material-ui/icons/Functions';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import { AboutMe, Me, Clothes, Text, FeatureList, Features } from './style';
import meImg from 'assets/me/CUMP_jalford-me.jpg';

const listOfFeatures: [React.FunctionComponent, string][] = [
	[() => <CodeIcon />, 'Developer Artist at Electronic Caregiver'],
	[() => <FunctionsIcon />, 'Student of Applied Mathematics'],
	[() => <PhotoCameraIcon />, 'Photographer and Novelist']
];

const About2 = () => (
	<AboutMe>
		<Clothes>
			<Me src={meImg} />
			<FeatureList>
				<Features items={listOfFeatures} />
			</FeatureList>
		</Clothes>
	</AboutMe>
);

export default About2;
