import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const DeleteLessonById = async (courseId) => {
  const result = await http.delete(`${MainURL}lesson/${courseId}`);
  return result.data;
};
