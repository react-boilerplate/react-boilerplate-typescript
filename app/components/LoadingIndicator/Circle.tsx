import * as React from 'react';
import styled, { keyframes } from 'styles/styled-components';

interface Props {
  rotate?: number;
  delay?: number;
  id?: string;
}

const circleFadeDelay = keyframes`
  0%,
  39%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
`;

const CirclePrimitive = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  ${(props: Props) =>
    props.rotate &&
    `
      -webkit-transform: rotate(${props.rotate}deg);
      -ms-transform: rotate(${props.rotate}deg);
      transform: rotate(${props.rotate}deg);
    `} &:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: #999;
    border-radius: 100%;
    animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
    ${(props: Props) =>
      props.delay && // eslint-disable-line indent
      `
        -webkit-animation-delay: ${props.delay}s;
        animation-delay: ${props.delay}s;
      `};
  }
`;
const Circle = (props: Props) => (
  <CirclePrimitive rotate={props.rotate} delay={props.delay} />
);

export default Circle;
