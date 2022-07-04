import React from "react";
import styled from "styled-components";

const Error = styled.div`
  padding: 100px 0;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

function ErrorAlert ({children}) {
  return(
    <Error>
      {children}
    </Error>
  );
}

export default ErrorAlert;