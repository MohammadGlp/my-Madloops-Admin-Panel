import http from '../Interceptor/Interceptor';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

const GetCourseById = async (id) => {
  let res = await http.get(`${MainURL}course/${id}`);
  return res.data;
};

export { GetCourseById };
