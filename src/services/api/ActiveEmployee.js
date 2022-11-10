import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const ActiveEmployee = async (employeeId) => {
  const result = await http.put(`${MainURL}employee/active/${employeeId}`);
  return result.data;
};
