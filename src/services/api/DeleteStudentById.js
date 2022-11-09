import http from "../Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const DeleteStudentById = async (studentId, studentName) => {
  try {
    //Calling Api To Delete The Student By Id ...
    const result = await http.delete(`${MainURL}student/${studentId}`);

    //Condition For Displaying A Massage If The The Result Of Deleteing The Student Is True
    if ((result.data.success = true)) {
      toast.warning(`دانشجو ${studentName} حذف گردید`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
