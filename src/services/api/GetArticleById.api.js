import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

const GetArticleById = async (id) => {
  try {
    let res = await http.get(`${MainURL}news/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export { GetArticleById };
