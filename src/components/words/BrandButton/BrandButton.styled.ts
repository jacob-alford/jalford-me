import { MouseEvent } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import styled from 'styled-components';

interface ButtonProps {
  width: number;
  height: number;
  prefix: string;
  marginoverride?: string;
  shadowoverride?: string;
  onClick: (evt: MouseEvent<HTMLDivElement>) => void;
  usehighlight?: boolean;
}

export const Button = styled(ButtonBase)`
  width: ${(props: ButtonProps) => props.width}px;
  height: ${(props: ButtonProps) => props.height}px;
  min-height: ${(props: ButtonProps) => props.height}px;
  filter: ${(props: ButtonProps) => props.shadowoverride};
  margin: ${(props: ButtonProps) => props.marginoverride} !important;
  background: url(${(props: ButtonProps) => props.prefix}-normal.png);
  background-size: 100% 100%;
  &:focus {
    background: url(${(props: ButtonProps) => props.prefix}-focus.png);
    background-size: 100% 100%;
    ${props =>
      props.usehighlight
        ? `outline: 4px solid rgba(85, 203, 217, 0.4);
    outline-offset: -4px;`
        : ''}
  }
  &:active {
    background: url(${(props: ButtonProps) => props.prefix}-pressed.png);
    background-size: 100% 100%;
    ${props =>
      props.usehighlight
        ? `outline: 4px solid rgba(85, 203, 217, .78);
    outline-offset: -4px;`
        : ''}
  }
  &:disabled {
    background: url(${(props: ButtonProps) => props.prefix}-disabled.png);
    background-size: 100% 100%;
  }
`;
