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

const AuthenticationRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/lessons",
    element: <LessonList />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/students",
    element: <StudentsList />,
  },
  {
    path: "/teachers",
    element: <TeachersList />,
  },
  {
    path: "/employees",
    element: <EmployeesList />,
  },
  {
    path: "/edit-profile",
    element: <AccountSettings />,
  },
  {
    path: "/comments",
    element: <CommentList />,
  },
];

export default AuthenticationRoutes;
