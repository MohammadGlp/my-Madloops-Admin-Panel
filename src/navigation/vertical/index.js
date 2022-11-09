import { Mail, Home, Layers } from 'react-feather';

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home',
  },
  {
    id: 'secondPage',
    title: 'Courses',
    icon: <Layers size={20} />,
    navLink: '/courses-page',
  },
];
