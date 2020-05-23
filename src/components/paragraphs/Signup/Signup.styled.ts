import styled from 'styled-components';
import { animated as a } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AlfordButton from 'components/words/AlfordButton/AlfordButton';
import C from 'theme-constants';
import { themeState } from 'global-state';

const isL6Fbck = (str: string) => (str.length === 7 ? str : '#14b2c7');

export const SignupDialogue = styled.div`
  display: flex;
  flex-flow: column;
  padding: ${C.spacing(0)};
  margin: ${C.spacing(0)};
  border: 2px solid ${(props: { colour: string }) => isL6Fbck(props.colour)};
  text-align: center;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
  background: ${(props: { theme: themeState }) => C.contBack(props.theme)};
  transition: background 0.5s, color 0.5s, border 0.5s;
`;

export const Title = styled(Typography)`
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  font-weight: 900 !important;
  transition: background 0.5s, color 0.5s;
  margin: 0px !important;
`;

export const Divider = styled.div`
  background: ${(props: { theme: themeState }) => C.div(props.theme)};
  height: 2px;
  width: 100%;
  margin: ${C.spacing(0)} 0px ${C.spacing(0)} 0px !important;
  transition: background 0.5s, color 0.5s;
`;

export const Button = styled(AlfordButton)`
  margin: 7px 0px 7px 0px !important;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  & > * {
    width: 100%;
  }
`;

export const FormField = styled(TextField)`
  margin: 7px !important;
`;

export const PasswordMeter = styled(a.div)`
  height: ${C.spacing(0)};
  margin: ${C.spacing(0)};
  margin-left: 0px;
  margin-right: 0px;
  border-radius: ${C.borderRadius};
`;
