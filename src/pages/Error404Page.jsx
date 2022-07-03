import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Content = styled.div`
  padding: 20px 30px;
`;
const ErrorTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 32px;
  font-weight: 600;
`;
const ErrorText = styled.p`
  &>a{
    color: var(--color-blue);
    &:hover{
      text-decoration: underline;
    }
  }
`;

function Error404Page () {
  return(
    <Content>
      <ErrorTitle>Ошибка 404</ErrorTitle>
      <ErrorText>Страница не найдена. <NavLink to="/">На главную</NavLink></ErrorText>
    </Content>
  );
}

export default Error404Page;