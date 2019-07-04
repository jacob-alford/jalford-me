import styled from 'styled-components';

export const StyledRPN = styled.div`
  @media only screen and (min-width:1280px){
    .stackAndButtons{
      width:75%;
    }
  }
  @media only screen and (max-width:1279px){
    .stackAndButtons{
      width:100%;
    }
  }
  .stackAndButtons{

  }
  .calcGrid{
    width:100vw;
  }
  .tapeHolder{
    width:25%;
  }
  .tapeRow{
    height:${props => (props.headerIsOpen) ? "7.5vh" : "10vh"};
    padding-top:0px;
    padding-bottom:0px;
    text-align:right;
    color:white;
  }
  .tapeLine{

  }
  .drawerHolder{
    width:25vw;
    position:absolute;
  }
  .drawerIcon{
    width:50px;
    height:50px;
    position:absolute;
    cursor:pointer;
    top:10px;
    left:10px;
    z-index:1;
    transition: transform .25s;
    color:red;
  }
  .drawerIcon:hover{
    transform:translateY(-3px);
  }
  .tapeDisplay{
    height:100%;
    table-layout:fixed;
  }
  .tapeDrawer{

  }
  .stackHolder{

  }
  .stackDisplay{
    height:100%;
    table-layout:fixed;
    background-image:linear-gradient(black,darkblue);
  }
  .stackLine{
    height:${props => (props.headerIsOpen) ? "7.5vh" : "10vh"};
    padding-top:0px;
    padding-bottom:0px;
    text-align:right;
    color:white;
  }
  .tableCell{
    text-align:center;
    cursor:pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }
  .calcTable{
    transition: height .75s;
  }
  .calcRow{
    height:${props => (props.headerIsOpen) ? "6.25vh" : "8.333333333vh"};
  }
  .action{
    background-color: #007bff;
    color:#ffffff;
    transition:background-color .5s;
  }
  .action:hover{
    background-color:#3a98fc;
  }
  .number{
    background-color:#6c757d;
    color:#ffffff;
    transition:background-color .5s;
  }
  .number:hover{
    background-color:#999999;
  }
  .delete{
    background-color:#f8f9fa;
    color:#ff0000;
    transition:background-color .5s;
  }
  .delete:hover{
    background-color:#e0e0e0;
  }
  .function{
    background-color:#f8f9fa;
    color:#000000;
    transition:background-color .5s;
  }
  .function:hover{
    background-color:#e0e0e0;
  }
`;
