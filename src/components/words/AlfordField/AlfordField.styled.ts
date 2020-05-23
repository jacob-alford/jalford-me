import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
// import { themeState } from 'global-state';
import C from 'theme-constants';

export const Field = styled(TextField)`
  height: max-content;
  margin: 7px 0px 7px 0px !important;
  .MuiInputBase-input {
    color: ${props => C.text(props.theme)} !important;
    transition: color 0.5s;
  }
  .Mui-focused {
    color: ${props => C.action(props.theme)} !important;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => C.action(props.theme)} !important;
    transition: border-color 0.5s;
  }
  .MuiFormLabel-root {
    color: ${props => C.textDim(props.theme)};
  }
`;
