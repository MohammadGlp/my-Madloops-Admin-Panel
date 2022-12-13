import { lazy } from "react";

const Home = lazy(() => import("./../../views/Home"));
const Courses = lazy(() => import("../../views/Courses/Courses"));
const Blogs = lazy(() => import("../../views/Blogs/Blogs"));
const LessonList = lazy(() => import("./../../views/Lessons/Lessons"));
const AccountSettings = lazy(() => import("../../views/account-settings"));
const EmployeesList = lazy(() => import("./../../views/Employes/EmployeeList"));
const TeachersList = lazy(() => import("./../../views/Teachers/TeachersList"));
const StudentsList = lazy(() => import("./../../views/Students/StudentsList"));
const CommentList = lazy(() => import("./../../views/Comments/CommentList"));
const Error = lazy(() => import("../../views/Error"));
import { Navigate } from "react-router-dom";

const AuthenticationRoutes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
    auth: true,
  },
  {
    path: "/home",
    element: <Home />,
    auth: true,
  },
  {
    path: "/courses",
    element: <Courses />,
    auth: true,
  },
  {
    path: "/lessons",
    element: <LessonList />,
    auth: true,
  },
  {
    path: "/blogs",
    element: <Blogs />,
    auth: true,
  },
  {
    path: "/students",
    element: <StudentsList />,
    auth: true,
  },
  {
    path: "/teachers",
    element: <TeachersList />,
    auth: true,
  },
  {
    path: "/employees",
    element: <EmployeesList />,
    auth: true,
  },
  {
    path: "/edit-profile",
    element: <AccountSettings />,
    auth: true,
  },
  {
    path: "/comments",
    element: <CommentList />,
    auth: true,
  },
  {
    path: "*",
    element: <Error />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
    },
    auth: true,
  },
];

export default AuthenticationRoutes;
