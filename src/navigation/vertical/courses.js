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
    title: 'لیست دوره ها',
    icon: <Layers size={20} />,
    navLink: '/courses',
  },
  {
    id: 'courses',
    title: 'اضافه کردن دوره',
    icon: <Layers size={20} />,
    navLink: '/addCourse',
  },
];
