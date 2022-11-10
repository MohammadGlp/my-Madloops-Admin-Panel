// ** React Imports
import { Fragment, lazy } from 'react';
import { Navigate } from 'react-router-dom';
// ** Layouts
import BlankLayout from '@layouts/BlankLayout';
import VerticalLayout from '@src/layouts/VerticalLayout';
import HorizontalLayout from '@src/layouts/HorizontalLayout';
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper';

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute';

// ** Utils
import { isObjEmpty } from '@utils';
import AddCourse from '../../views/Courses/AddCourse';
import StudentEdit from '../../views/Students/StudentEdit';

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template';

// ** Default Route
const DefaultRoute = '/home';

const Home = lazy(() => import('../../views/Home'));
const Courses = lazy(() => import('../../views/Courses/Courses'));
const Blogs = lazy(() => import('../../views/Blogs/Blogs'));
const LessonList = lazy(() =>
  import('./../../views/Lessons/Lessons')
);
const AccountSettings = lazy(() =>
  import('../../views/account-settings')
);
const EmployeesList = lazy(() =>
  import('./../../views/Employes/EmployeeList')
);
const TeachersList = lazy(() =>
  import('./../../views/Teachers/TeachersList')
);
const StudentsList = lazy(() =>
  import('./../../views/Students/StudentsList')
);
const Login = lazy(() => import('../../views/LoginBasic'));
const Register = lazy(() => import('../../views/RegisterBasic'));
const CommentList = lazy(() =>
  import('./../../views/Comments/CommentList')
);
const Error = lazy(() => import('../../views/Error'));

// ** Merge Routes
const Routes = [
  {
    path: '/',
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/courses',
    element: <Courses />,
  },
  {
    path: '/addCourse',
    element: <AddCourse />,
  },
  {
    path: '/lessons',
    element: <LessonList />,
  },
  {
    path: '/blogs',
    element: <Blogs />,
  },
  {
    path: '/students',
    element: <StudentsList />,
  },
  {
    path: '/editStudent/:studentId',
    element: <StudentEdit />,
  },
  {
    path: '/teachers',
    element: <TeachersList />,
  },
  {
    path: '/employees',
    element: <EmployeesList />,
  },
  {
    path: '/edit-profile',
    element: <AccountSettings />,
  },
  {
    path: '/comments',
    element: <CommentList />,
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/register',
    element: <Register />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    element: <Error />,
    meta: {
      layout: 'blank',
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta &&
          route.meta.layout &&
          route.meta.layout === layout) ||
        ((route.meta === undefined ||
          route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank'
            ? (isBlank = true)
            : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper
              {...(isBlank === false ? getRouteMeta(route) : {})}
            >
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || 'vertical';
  const layouts = ['vertical', 'horizontal', 'blank'];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
