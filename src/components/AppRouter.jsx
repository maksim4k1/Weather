import React from "react";
import { Route, Routes } from "react-router-dom";
import generalRoutes from "../routes/generalRoutes";

function AppRouter() {
  return(
    <>
      <Routes>
        {
          generalRoutes.map((route, index) => {
            return <Route key={index} {...route}/>
          })
        }
      </Routes>
    </>
  );
}

export default AppRouter;