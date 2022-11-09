import http from "../../Services/Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AddCourse = async (courseData) => {
  try {
    //Calling Api To Create An Course ... !!!
    const result = await http.post(`${MainURL}course/add`, courseData);

    console.log(result);

    //Condition To Displaying Success Massage To Creating An Course Was Seccessfull ::
    if ((result.data.success = true)) {
      toast.success(`دوره با موفقیت افزوده شد`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
