import http from '../Interceptor/Interceptor';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AddStudentToCourse = async (courseId, studentId) => {
  const data = { courseId };

  const result = await http.post(
    `${MainURL}course/addStudentToCourse/${studentId}`,
    data
  );

  return result;
};
