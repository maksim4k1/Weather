import React from "react";
import styled from "styled-components";

const LoaderElement = styled.div`
  padding: 100px 0;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

function Loader () {
  return(
    <LoaderElement>
      Загрузка...
    </LoaderElement>
  );
}

export default Loader;