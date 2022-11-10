import http from '../Interceptor/Interceptor';
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const DeleteStudentById = async (studentId) => {
  const result = await http.delete(`${MainURL}student/${studentId}`);

  return result.data;
};
