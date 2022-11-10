import axios from "axios";
import http from "../Interceptor/Interceptor";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const UploadFile = async (image) => {
  try {
    //console.log(image);
    const result = await axios({
      method: "POST",
      url: `${MainURL}upload/image`,
      data: image.myFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return result;
  } catch (error) {}
};
