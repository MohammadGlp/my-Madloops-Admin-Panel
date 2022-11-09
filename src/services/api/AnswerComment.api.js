import http from "../Interceptor/Interceptor";
import { toast } from "react-toastify";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AnswerComment = async (
  commentAnswer,
  commentId,
  refreshComments
) => {
  try {
    //Make The ID & Answer Parameter As Same As Send Comment Answer Api Needed ::
    const CommentData = { id: commentId, answer: commentAnswer };

    //Call The Api ::
    const result = await http.post(`${MainURL}comment/answer`, CommentData);

    //If We Have Seccess Result Of Answering Comment => Display A Toast Massage & Refresh Comments State
    if (result) {
      toast.success("پاسخ شما با موفقیت ثبت شد");
      refreshComments((old) => !old);
    }

    return result;
  } catch (error) {
    return null;
  }
};
