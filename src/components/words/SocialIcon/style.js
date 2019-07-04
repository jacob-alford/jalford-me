import styled from 'styled-components';
import { constants as c } from '../../../theme';

export const StyledSocialIcon = styled.div`
  .icon{
    margin:10px;
    width:35px;
    height:35px;
    color:white;
  }
  .iconHolder{
    margin: 20px 15px 20px;
    border-radius:50%;
    background-color:${c.link};
    transition:background .25s;
  }
  .iconHolder:hover{
    background-color:${c.linkHover}
  }
`;
