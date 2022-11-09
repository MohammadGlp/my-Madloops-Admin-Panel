import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetAllComments = async () => {
  try {
    const result = await http.get(`${MainURL}comment`);
    return result;
  } catch (error) {
    return null;
  }
};
