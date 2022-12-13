import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Error = lazy(() => import("../../views/Error"));
const Login = lazy(() => import("../../views/LoginBasic"));
const Register = lazy(() => import("../../views/RegisterBasic"));

const UnAuthentication = [
  {
    path: "/",
    element: <Navigate to="/login" />,
    auth: false,
  },
  {
    path: "/login",
    element: <Login />,
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
      restricted: true,
      layout: "blank",
    },
    auth: false,
  },
  {
    path: "/register",
    element: <Register />,
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
      layout: "blank",
      restricted: true,
    },
    auth: false,
  },
  {
    path: "*",
    element: <Error />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
    },
    auth: false,
  },
];
export default UnAuthentication;
