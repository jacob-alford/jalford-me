import styled from 'styled-components';
import C from '../constants';

const EnteringValue = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 38px;
	width: calc(50% - 8px);
	background: ${C.blue(2)};
	border: 2px solid ${C.blue(0)};
	border-radius: 12px;
	color: white;
	height: ${C.h};
	padding: 8px;
	&:after {
		font-size: 38px;
		margin-left: 16px;
		margin-top: -8px;
		content: '←';
	}
`;

export default EnteringValue;
