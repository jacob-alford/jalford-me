import styled from 'styled-components';
import { animated as a } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import { themeState } from 'global-state';
import C from 'theme-constants';

export const Card = styled(a.div)`
  transition: background 0.5s;
  display: flex;
  flex-flow: column nowrap;
  min-width: max-content;
  min-height: min-content;
  padding: ${C.spacing(0)};
  border: 2px solid ${C.prim(2)};
  margin: ${C.spacing(0)};
  background: ${(props: { theme: themeState }) => C.contBack(props.theme)};
`;

export const Cat = styled.p`
  color: ${(props: { theme: themeState }) => C.textDim(props.theme)};
  transition: color 0.5s;
  margin: 0px;
  margin-bottom: 7px;
  font-style: italic;
  font-weight: 500;
`;

export const TandD = styled.div`
  flex-grow: 2;
`;

export const PostTitle = styled(Typography)`
  transition: color 0.5s;
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  font-weight: 900 !important;
`;

export const Date = styled(Typography)`
  transition: color 0.5s;
  color: ${(props: { theme: themeState }) => C.textAlt(props.theme)};
  font-weight: 300 !important;
`;

export const Actions = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  margin-top: ${C.spacing(0)};
`;
