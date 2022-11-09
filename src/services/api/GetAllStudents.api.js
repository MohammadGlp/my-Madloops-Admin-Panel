import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetAllStudents = async () => {
  try {
    const result = await http.get(`${MainURL}student/getall`);
    return result.data;
  } catch (error) {
    return null;
  }
};
