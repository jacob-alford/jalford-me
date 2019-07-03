import styled from 'styled-components';

export const StyledRPN = styled.div`
  @media only screen and (min-width:1280px){
    .stackAndButtons{
      width:75%;
    }
  }
  @media only screen and (max-width:1280px){
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
    height:3%;
    padding-top:0px;
    padding-bottom:0px;
    text-align:right;
    color:white;
  }
  .tapeDisplay{
    height:100%;
    table-layout:fixed;
  }
  .stackHolder{
    height:${props => (props.headerIsOpen) ? "37.5vh" : "50vh"};
    transition: height .75s;
  }
  .stackDisplay{
    height:100%;
    table-layout:fixed;
    background-image:linear-gradient(black,darkblue);
  }
  .stackLine{
    height:20%;
    padding-top:0px;
    padding-bottom:0px;
    text-align:right;
    color:white;
  }
  .stackRow{

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
    height:${props => (props.headerIsOpen) ? "37.5vh" : "50vh"};
    transition: height .75s;
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
