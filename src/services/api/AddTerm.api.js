import http from "../../Services/Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AddTerm = async (termData) => {
  try {
    //Calling Api To Create An Term ... !!!
    const result = await http.post(`${MainURL}term`, termData);

    console.log(result);

    //Condition To Displaying Success Massage To Creating An Term Was Seccessfull ::
    if ((result.data.success = true)) {
      toast.success(`ترم با موفقیت افزوده شد`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
