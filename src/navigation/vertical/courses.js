import { Mail, Home, Layers, PieChart, Circle } from 'react-feather';

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home',
  },
  {
    id: 'courses',
    title: 'Courses',
    icon: <Layers size={20} />,
    navLink: '/courses',
  },
];
