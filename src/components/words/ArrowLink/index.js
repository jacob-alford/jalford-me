import React , { useCallback } from 'react';

import useReactRouter from 'use-react-router';
import styled from 'styled-components';

import Container from '../Holder';

const ArrowedSpan = styled.span`
  cursor:pointer;
  text-decoration:none;
  ::after{
    display:inline-block;
    content:'»';
    padding-left:.3rem;
    text-decoration:none;
  }
  :hover{
    text-decoration:underline;
  }
`;

export default function ArrowLink(props){
  const { href , text } = props;
  const { history } = useReactRouter();
  const redirect = useCallback(() => {
    if(href.includes('http'))
      window.location.href = href;
    else
      history.push(href);
  },[history,href]);
  return (
    <Container direction='row'>
      <ArrowedSpan onClick={redirect}>
        {text}
      </ArrowedSpan>
    </Container>
  );
}
