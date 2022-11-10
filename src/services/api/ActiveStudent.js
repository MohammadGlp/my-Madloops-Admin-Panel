import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const ActiveStudent = async (studentId) => {
  const result = await http.put(`${MainURL}student/active/${studentId}`);
  return result.data;
};
