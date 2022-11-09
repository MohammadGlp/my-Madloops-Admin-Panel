import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

const GetAllNews_Articles = async () => {
  try {
    let res = await http.get(`${MainURL}news`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export { GetAllNews_Articles };
