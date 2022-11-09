import http from '../Interceptor/Interceptor';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const DeleteCourse = async (courseId) => {
  const result = await http.delete(`${MainURL}course/${courseId}`);
  return result.data;
};
