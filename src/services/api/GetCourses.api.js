import http from "../Interceptor/Interceptor";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetCourses = async () => {
  try {
    const result = await http.get(`${MainURL}course`);
    return result.data;
  } catch (error) {
    return null;
  }
};
