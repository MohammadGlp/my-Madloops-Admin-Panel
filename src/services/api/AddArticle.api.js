import http from "../../Services/Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AddArticle = async (articleData) => {
  try {
    //Calling Api To Create An Article ... !!!
    const result = await http.post(`${MainURL}news`, articleData);

    console.log(result);

    //Condition To Displaying Success Massage To Creating An Article Was Seccessfull ::
    if ((result.data.success = true)) {
      toast.success(`مقاله با موفقیت افزوده شد`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
