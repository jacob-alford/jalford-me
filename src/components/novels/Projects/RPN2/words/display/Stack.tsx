import React from 'react';
import styled from 'styled-components';

import C from '../constants';

const Stack = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	background: ${C.pink(2)};
	height: 333px;
	width: 308.55px;
	margin: 16px;
`;

export default Stack;
