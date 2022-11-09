import axios from 'axios';
import { getToken } from '../AuthServices/AuthServices';
import toast from 'react-hot-toast';

axios.interceptors.response.use(
  (response) => {
    // console.log("با موفقیت انجام شد");
    // toast.success(response.data.message[0].message);
    return response;
  },
  async (error) => {
    // check if error is expected from backend
    try {
      const expectedError =
        error.response &&
        error.response.state >= 400 &&
        error.response.status < 500;

      // if error doesnt expected when we log it
      // console.log(error.response.data.message);
      if (!expectedError) {
        // tweak it later
        // get error message from backend (see object of response later... maybe its changed)
        try {
          // toast.error(error.response.data.message[0].message);
          // console.log(error.response.data.message.message[0].message);
        } catch (er) {
          // toast.error(error.response.data.message.message[0].message);
        }
      }
    } catch (error) {}
    return Promise.reject(error);
  }
);

// will send token to headers request ( in x-auth-token body )
axios.interceptors.request.use((config) => {
  // config.headers["content-type"] = "multipart/form-data";
  // config.headers["accept"] = "application/json";
  config.headers['x-auth-token'] = getToken();
  return config;
});

export default axios;
