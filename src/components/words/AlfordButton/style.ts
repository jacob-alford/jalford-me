import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import C from 'theme-constants';

const base = `
  text-transform: lowercase !important;
  border-radius: ${C.borderRadius} !important;
`;

export const Disabled = styled(Button)`
  background: #dedede !important;
  color: #565656 !important;
  ${base}
`;

export const Primary = styled(Button)`
  background: ${C.prim(3)} !important;
  color: white !important;
  ${base}
`;

export const Secondary = styled(Button)`
  background: ${C.acc(2)} !important;
  ${base}
`;

export const Success = styled(Button)`
  background: ${C.success} !important;
  ${base}
`;

export const Danger = styled(Button)`
  background: ${C.danger} !important;
  ${base}
`;

export const Link = styled(Button)`
  color: ${C.prim(2)} !important;
  ${base}
`;
