import React from 'react';
import styled from 'styled-components';
import C from '../constants';

const Tape = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	width: 30%;
	height: 100%;
	border-radius: 0px 12px 0px 0px;
	padding: 8px;
	background: ${C.blue(2)};
	overflow: hidden;
`;

export default Tape;
