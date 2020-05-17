import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { themeState } from 'global-state';
import C from 'theme-constants';

interface CatContProps {
  theme: themeState;
  children?: any;
  bgOvrd?: string;
  textOvrd?: string;
  divOvrd?: string;
}

export const CatCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: ${C.spacing(1)};
  min-height: ${C.v};
  transition: color 0.5s, background 0.5s;
  background: ${(props: CatContProps) =>
    props.bgOvrd ? props.bgOvrd : C.contBackAlt(props.theme)};
  color: ${(props: CatContProps) =>
    props.textOvrd ? props.textOvrd : C.text(props.theme)};
`;

export const Title = styled(Typography)``;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  transition: background 0.5s;
  background: ${(props: CatContProps) =>
    props.divOvrd ? props.divOvrd : C.div(props.theme)};
  margin: ${C.spacing(0)} 0px ${C.spacing(0)} 0px;
`;

export const PapersHolder = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: auto;
  height: max-content;
  filter: ${C.shadow(2)};
  overflow-y: hidden;
`;
