import http from '../Interceptor/Interceptor';
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditArticle = async (object, articleId) => {
  const result = await http.put(
    `${MainURL}news/${articleId}`,
    object
  );

  return result.data;
};
