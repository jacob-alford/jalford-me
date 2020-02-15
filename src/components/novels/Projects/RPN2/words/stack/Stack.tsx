import React from 'react';
import styled from 'styled-components';

import { themeSelect } from 'theme';

const [majorSpacing] = themeSelect(['getMajorSpacing']);

const Stack = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	padding: majorSpacing;
`;

export default Stack;
