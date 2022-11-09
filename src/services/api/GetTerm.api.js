import http from "../Interceptor/Interceptor";
// nothing spc
//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const GetTerm = async () => {
  try {
    const result = await http.get(`${MainURL}term/getall`);
    return result.data;
  } catch (error) {
    return null;
  }
};
