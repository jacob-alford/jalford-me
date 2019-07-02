import styled from 'styled-components';

export const StyledRPN = styled.div`
  .calcGrid{
      height:100vh;
      width:100%;
  }
  .tableCell{
    cursor:pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }
  .table{
    width:100%;
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
