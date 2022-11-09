import http from '../Interceptor/Interceptor';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetAllLessons = async () => {
  const result = await http.get(`${MainURL}lesson`);
  return result.data;
};
