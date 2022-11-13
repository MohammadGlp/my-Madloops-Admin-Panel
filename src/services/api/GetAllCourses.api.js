import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const getAllCourses = async () => {
  const courses = await http.get(`${MainURL}course/getall`);
  return courses;
};
