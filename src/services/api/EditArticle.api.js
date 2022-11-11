import http from '../Interceptor/Interceptor';
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditArticle = async (object, articleId) => {
  const data = {
    title: object?.title,
    category: object?.category?.value,
    image: 'dfg',
    text: object.text,
  };
  console.log(data);
  const result = await http.put(`${MainURL}news/${articleId}`, data);

  return result.data;
};
