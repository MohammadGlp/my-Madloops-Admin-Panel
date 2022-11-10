import http from "../Interceptor/Interceptor";
import toast from "react-hot-toast";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditArticle = async (object, articleId, manageModal) => {
  try {
    const result = await http.put(`${MainURL}news/${articleId}`, object);

    if ((result.data.success = true)) {
      toast.success("تغییرات با موفقیت ثبت شد");
      setTimeout(() => {
        manageModal(false);
      }, 5000);
    }

    return result.data;
  } catch (error) {
    //console.log(error);
    return null;
  }
};
