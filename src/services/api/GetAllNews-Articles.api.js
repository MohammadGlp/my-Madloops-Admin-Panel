import http from '../Interceptor/Interceptor';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

const GetAllNews_Articles = async () => {
  let res = await http.get(`${MainURL}news`);
  return res.data;
};

export { GetAllNews_Articles };
