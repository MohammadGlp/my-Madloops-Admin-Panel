import http from "../Interceptor/Interceptor";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditEmployeeAll = async (object, id) => {
  try {
    console.log(object);
    const result = await http.put(`${MainURL}employee/${id}`, object);
    console.log(result);

    return result.data;
  } catch (error) {
    return null;
  }
};
