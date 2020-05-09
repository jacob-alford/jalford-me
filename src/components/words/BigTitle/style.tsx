import { animated as a } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const MUITitle = styled(a(Typography))`
  font-weight: bolder !important;
  user-select: none !important;
  z-index: 2;
  margin-top: -53px !important;
  @media (max-width: 450px) {
    font-size: 64px !important;
  }
  @media (min-width: 451px) {
    font-size: 96px !important;
  }
`;
export const DB = styled.span`
  color: #304261;
`;
export const Blue = styled.span`
  color: #14b2c7;
`;
export const Mag = styled.span`
  color: #c70066;
`;
export const Red = styled.span`
  color: #fa2400;
`;
