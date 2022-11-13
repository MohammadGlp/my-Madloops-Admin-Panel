import http from "../../Interceptor/Interceptor";
import * as Storage from "../../storage/storage";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const LoginEmployee = async (object) => {
  // try {
  //Make An Object Base On What We Get From Our Login Form & What Api Need To Login The Employee
  const employeeData = {
    email: object.email,
    password: object.password,
  };

  //Calling Api To Send The Information From Login Form

  const result = await http.post(`${MainURL}auth/employee/login`, employeeData);

  //Access To Employee Token & Employee Information
  const employeeToken = result.data.result.jwtToken;
  const employeeInfo = result.data.result.employeeModel;

  //Set The Employee Token & Employee Information In Local Storage Or Session Storage

  Storage.setItem("token", employeeToken);
  Storage.setItem("userInfo", JSON.stringify(employeeInfo));

  Storage.sessionSetItem("token", employeeToken);
  Storage.sessionSetItem("userInfo", JSON.stringify(employeeInfo));

  //Condition For Displaying Toast Massage If The Login Is Seccessfull

  //Redirect The Employee To Admin Pannel Page

  return result.data;
  // } catch (error) {
  //   toast.error(error.data.message[0].message);
  // }
};
