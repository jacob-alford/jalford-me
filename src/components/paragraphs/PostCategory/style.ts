import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { themeState } from 'global-state';
import C from 'theme-constants';

interface CatContProps {
  theme: themeState;
  children?: any;
}

export const CatCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: ${C.spacing(1)};
  min-height: ${C.v};
  transition: color 0.5s, background 0.5s;
  background: ${(props: CatContProps) => C.contBackAlt(props.theme)};
  color: ${(props: CatContProps) => C.text(props.theme)};
`;

export const Title = styled(Typography)``;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  transition: background 0.5s;
  background: ${(props: CatContProps) => C.div(props.theme)};
  margin: ${C.spacing(0)} 0px ${C.spacing(0)} 0px;
`;

export const PostHolder = styled.div`
  width: 100%;
  --auto-grid-min-size: 16rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--auto-grid-min-size), 2fr));
  grid-gap: ${C.spacing(0)};
  filter: ${C.shadow(2)};
  overflow-y: hidden;
  overflow-x: auto;
`;
