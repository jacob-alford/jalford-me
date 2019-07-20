import styled from 'styled-components';

export const StyledHeading = styled.div`
  .hideButton{
    width:50px;
    height:50px;
    position:absolute;
    cursor:pointer;
    margin-top:10px;
    left:calc(100% - 60px);
    z-index:1;
    transition: transform .25s;
  }
  .hideButton:hover{
    transform: translateY(-3px);
  }
  .hidden{
    min-height:0px !important;
    height:0px !important;
    opacity:0;
  }
  .container{
    transition: height .75s, opacity .75s;
    width:100%;
    height:25vh;
    min-height:106px;
    background: #1488CC;
    background: -webkit-linear-gradient(to right, #56CCF2, #2F80ED);
    background: linear-gradient(to right, #56CCF2, #2F80ED);
    -moz-box-shadow: inset 0 -10px 16px -10px rgba(11,11,11,.6);
    -webkit-box-shadow: inset 0 -10px 16px -10px rgba(11,11,11,.6);
    box-shadow: inset 0 -10px 16px -10px rgba(11,11,11,.6);
  }
`;
