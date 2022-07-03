import DayPage from "../pages/DayPage";
import Error404Page from "../pages/Error404Page";
import MainPage from "../pages/MainPage";

const generalRoutes = [
  {path: "/", element: <MainPage/>},
  {path: "/day/:id", element: <DayPage/>},
  {path: "*", element: <Error404Page/>},
];

export default generalRoutes;