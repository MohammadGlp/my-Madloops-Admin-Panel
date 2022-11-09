import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetStudentById = async (id) => {
  try {
    let result = await http.get(`${MainURL}student/${id}`);
    return result.data;
  } catch (error) {
    return null;
  }
};
