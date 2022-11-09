import http from '../Interceptor/Interceptor';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditCourse = async (object, courseId) => {
  console.log(courseId);
  const result = await http.put(`${MainURL}course/${courseId}`, {
    title: object.title,
    cost: Number(object.cost),
    endDate: object.endDate,
    startDate: object.startDate,
    capacity: Number(object.capacity),
    teacher: object.teacher.value,
    lesson: object.lesson.value,
  });

  return result.data;
};
