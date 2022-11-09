import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetEmployeeById = async (id) => {
  try {
    let result = await http.get(`${MainURL}employee/${id}`);
    return result.data;
  } catch (error) {
    return null;
  }
};
