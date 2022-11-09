import http from "../Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const DeleteEmployee = async (employeeId, employeeName) => {
  try {
    //Calling Api To Delete The Employee By Id ...
    const result = await http.delete(`${MainURL}employee/${employeeId}`);

    //Condition For Displaying A Massage If The The Result Of Deleteing The Employee Is True
    if ((result.data.success = true)) {
      toast.warning(`${employeeName} حذف گردید`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
