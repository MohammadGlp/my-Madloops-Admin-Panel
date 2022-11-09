import http from "../Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditCourse = async (
  object,
  courseId,
  refreshCoursesInfo,
  manageModal
) => {
  try {
    const result = await http.put(`${MainURL}course/${courseId}`, object);

    if ((result.data.success = true)) {
      toast.success("تغییرات با موفقیت ثبت شد");
      setTimeout(() => {
        refreshCoursesInfo((old) => !old);
        manageModal(false);
      }, 5000);
    }

    return result.data;
  } catch (error) {
    //console.log(error);
    return null;
  }
};
