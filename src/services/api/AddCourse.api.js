import http from '../Interceptor/Interceptor';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AddNewCourse = async (courseData) => {
  const result = await http.post(`${MainURL}course`, {
    title: courseData.title,
    cost: Number(courseData.cost),
    endDate: courseData.endDate,
    startDate: courseData.startDate,
    capacity: Number(courseData.capacity),
    teacher: courseData.teacher.value,
    lesson: courseData.lesson.value,
  });

  return result.data;
};
