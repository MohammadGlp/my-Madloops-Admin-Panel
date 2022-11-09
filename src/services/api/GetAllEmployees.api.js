import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetAllEmployees = async () => {
  try {
    const result = await http.get(`${MainURL}employee/getall`);
    return result.data;
  } catch (error) {
    return null;
  }
};
