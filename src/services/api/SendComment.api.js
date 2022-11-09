import http from "../Interceptor/Interceptor";
import { toast } from "react-toastify";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const SendComment = async (commentText, refreshCommentsList) => {
  try {
    //Call The Api ::
    const result = await http.post(`${MainURL}comment/send`, commentText);

    //If We Have Seccess Result Of Sending Comment => Display A Toast Massage & Refresh Comments State
    if (result) {
      toast.success("نظر شما با موفقیت ارسال شد ، در انتظار تایید آن باشید");
      refreshCommentsList((old) => !old);
    }

    return result;
  } catch (error) {
    return null;
  }
};
