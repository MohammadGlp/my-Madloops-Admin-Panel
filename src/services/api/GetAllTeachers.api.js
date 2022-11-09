import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetAllTeachers = async () => {
  try {
    const result = await http.get(`${MainURL}employee/getallteachers`);
    return result.data;
  } catch (error) {
    return null;
  }
};
