import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import C from 'theme-constants';
import { themeState } from 'global-state';

export const Card = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: ${C.spacing(0)};
  margin: ${C.spacing(0)};
  border: 2px solid ${C.prim(0)};
  width: 300px;
  text-align: center;
  height: max-content;
  justify-content: center;
  align-items: center;
  background: ${(props: { theme: themeState }) => C.contBack(props.theme)};
`;

export const Image = styled.img`
  width: ${(props: { width: number }) => props.width}px;
  margin-top: ${C.spacing(0)};
  margin-bottom: ${C.spacing(0)};
`;

export const Title = styled(Typography)`
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  font-weight: 900 !important;
`;

export const Description = styled(Typography)`
  color: ${(props: { theme: themeState }) => C.textDim(props.theme)};
  font-weight: 300 !important;
`;
