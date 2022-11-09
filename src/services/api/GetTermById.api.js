import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

const GetTermById = async (id) => {
  try {
    let res = await http.get(`${MainURL}term/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export { GetTermById };
