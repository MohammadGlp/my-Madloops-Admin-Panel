import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const DeactiveEmployee = async (employeeId) => {
  const result = await http.put(`${MainURL}employee/deactive/${employeeId}`);
  return result.data;
};
