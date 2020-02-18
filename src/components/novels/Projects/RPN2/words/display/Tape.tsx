import React from 'react';
import styled from 'styled-components';
import C from '../constants';

const Tape = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	flex-grow: 2;
	height: 351.06px;
	padding: 8px;
	margin: 16px 0px 0px 16px;
	border: 2px solid ${C.orange(2)};
	border-radius: 12px;
	width: 94.59px;
	background: ${C.blue(2)};
	overflow: hidden;
`;

export default Tape;
