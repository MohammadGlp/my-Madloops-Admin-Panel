import { useEffect, useState } from 'react';
import TableBasic from '../../components/common/TableBasic';
import { getAllCourses } from '../../services/api/courses/courses';

const SecondPage = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      const courses = await getAllCourses();
      setCourses(courses.data.result);
    };
    getAll();
  }, []);

  return <TableBasic data={courses} />;
};

export default SecondPage;
