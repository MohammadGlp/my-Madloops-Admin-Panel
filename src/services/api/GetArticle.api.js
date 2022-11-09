import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

const GetArticle = async () => {
  try {
    let res = await http.get(`${MainURL}news/category/article`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export { GetArticle };
