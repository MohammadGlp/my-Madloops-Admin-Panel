import http from "../Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const DeleteCourse = async (courseId) => {
  try {
    //Calling Api To Delete The Course Or Course By Id ...
    const result = await http.delete(`${MainURL}course/${courseId}`);

    //Condition For Displaying A Massage If The The Result Of Deleteing The Course Is True
    //And Reload The Page For Updating The Courses List ...
    if ((result.data.success = true)) {
      toast.warning(`آیتم مورد نظر حذف شد`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
