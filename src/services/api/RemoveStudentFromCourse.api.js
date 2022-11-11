import http from '../Interceptor/Interceptor';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const RemoveStudentFromCourse = async (
  courseId,
  studentId
) => {
  const data = { courseId };

  const result = await http.post(
    `${MainURL}course/removeStudentFromCourse/${studentId}`,
    data
  );

  return result;
};
