import http from "../Interceptor/Interceptor";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const UploadFile = async (image) => {
  try {
    //console.log(image);
    const result = await http.post(`${MainURL}upload/image`, image);
    return result;
  } catch (error) {}
};
