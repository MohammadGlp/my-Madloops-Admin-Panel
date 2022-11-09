import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const VarifyComment = async (commentId) => {
  try {
    //Make The ID Parameter As Same As Varify Api Needed ::
    const CommentId = { id: commentId };

    //Call The Api ::
    const result = await http.post(`${MainURL}comment/verify`, CommentId);
    return result;
  } catch (error) {
    return null;
  }
};
