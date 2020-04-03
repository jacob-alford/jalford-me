import { animated as a } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const MUITitle = styled(a(Typography))`
	font-weight: bolder !important;
	user-select: none !important;
	@media (max-width: 450px) {
		font-size: 64px !important;
		margin-top: -76.67px !important;
	}
	@media (min-width: 451px) {
		font-size: 96px !important;
		margin-top: -115.33px !important;
	}
`;
const DB = styled.span`
	color: #212832;
`;
const Blue = styled.span`
	color: #69beef;
`;
const Gray = styled.span`
	color: #262626;
`;

export { MUITitle, DB, Blue, Gray };
