// This Interceptor File Created For Better Result & Displaytion
// We Dont Use It In Our Project ==> I Write It For Use It In Future ...

import axios from "axios";
import { getToken } from "../AuthServices/AuthServices";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => {
    // console.log("با موفقیت انجام شد");
    toast.success(response.data.message[0].message);
    return response;
  },
  async (error) => {
    // check if error is expected from backend
    try {
      const expectedError =
        error.response &&
        // error.response.state >= 400 &&
        //Change State With Status :: Better Way
        error.response.status >= 400 &&
        error.response.status < 500;

      // if error expected when we log it
      if (expectedError) {
        // tweak it later
        // get error message from backend (see object of response later... maybe its changed)
        try {
          toast.error(error.response.data.message[0].message);
        } catch (er) {
          toast.error(error.response.data.message.message[0].message);
        }
      }
      // if error doesnt expected when we log it
      else {
        toast.error("مشکل از سرور ...");
      }
    } catch (error) {}
    return Promise.reject(error);
  }
);

// will send token to headers request ( in x-auth-token body )
axios.interceptors.request.use((config) => {
  config.headers["x-auth-token"] = getToken();
  return config;
});

export default axios;
