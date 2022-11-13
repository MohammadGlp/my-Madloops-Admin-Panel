import http from '../Interceptor/Interceptor';
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const LessonAdd = async (data) => {
  const result = await http.post(`${MainURL}lesson/add`, data);

  return result.data;
};
