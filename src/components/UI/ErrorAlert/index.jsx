import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Error = styled.div`
  width: 100%;
  padding: 15px 80px 30px;
  position: fixed;
  bottom: -15px;
  left: 0;
  background: var(--color-white);
  box-shadow: 0 0 10px var(--color-black-shadow);
  opacity: 0;
  visibility: hidden;
  z-index: 150;
  &.active{
    opacity: 1;
    visibility: visible;
    @keyframes animation {
      0% {
        transform: translateY(100px);
      }
      15% {
        transform: translateY(-10px);
      }
      30% {
        transform: translateY(0);
      }
      80% {
        transform: translateY(0);
      }
      90% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(100px);
      }
    }
    animation-name: animation;
    animation-duration: 4s;
  }
  @media screen and (max-width: 600px){
    padding: 10px 30px 30px;
  }
`;
const ErrorText = styled.p`
  font-size: 14px;
  &>span{
    display: block;
    color: var(--color-red);
    font-weight: 600;
  }
`;

function ErrorAlert ({error, isOpen}) {
  const [isActive, setIsActive] = useState(isOpen);

  useEffect(() => {
    if(isActive){
      setTimeout(() => {
        setIsActive(false);
      }, 4000);
    }
  }, [isActive, setIsActive]);

  return(
    <Error className={isActive ? "active" : ""}>
      <ErrorText><span>Ошибка!</span> {error}</ErrorText>
    </Error>
  );
}

export default ErrorAlert;