import styled from 'styled-components';

export const StyledRPN = styled.div`
  @media only screen and (max-width:765px){
    .stackAndButtons{
      width:100%;
    }
    .calcTable{
      width:100%;
    }
  }
  @media only screen and (min-width:766px){
    .stackAndButtons{
      width:100%;
    }
    .calcTable{
      width:50%;
    }
  }
  @media only screen and (min-width:1280px){
    .stackAndButtons{
      width:75%;
    }
    .calcTable{
      width:50%;
    }
  }
  .stackAndButtons{

  }
  .calcGrid{
    width:100vw;
  }
  .tapeHolder{
    width:25%;
    height:${props => (props.headerIsOpen) ? "75vh" : "100vh"};
    overflow-y:scroll;
  }
  .tapeRow{
    width:100%;
    height:${props => (props.headerIsOpen) ? "7.5vh" : "10vh"};
    padding-top:0px;
    padding-bottom:0px;
    text-align:right;
    color:white;
  }
  .tapeLine{
    background-color:white;
    height:${props => (props.headerIsOpen) ? "7.5vh" : "10vh"};
    padding-top:0px;
    padding-bottom:0px;
    text-align:right;
  }
  .drawerHolder{
    width:25vw;
    position:absolute;
  }
  .drawerIcon{
    width:25px;
    height:25px;
    position:absolute;
    cursor:pointer;
    top:15px;
    left:10px;
    z-index:1;
    transition: transform .25s, top .75s;
    color:red;
  }
  .drawerIcon:hover{
    transform:translateY(-3px);
  }
  .tapeDisplay{
    table-layout:fixed;
    height:100%;
  }
  .tapeDrawer{

  }
  .stackHolder{
    min-width:380.67px;
  }
  .stackDisplay{
    height:100%;
    table-layout:fixed;
    background-image:linear-gradient(#03001e,#7303c0,#ec38bc);
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
  .calcRow{
    height:${props => (props.headerIsOpen) ? "6.25vh" : "8.333333333vh"};
  }
  .calcTable{
    transition: height .75s;
    height:100%;
    background-color:white;
  }
  .action{
    background-color: #2F80ED;
    color:#ffffff;
    transition:background-color .5s;
  }
  .action:hover{
    background-color:#56CCF2;
  }
  .number{
    background-color:#03001e;
    color:#ffffff;
    transition:background-color .5s;
  }
  .number:hover{
    background-color:#7303c0;
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
