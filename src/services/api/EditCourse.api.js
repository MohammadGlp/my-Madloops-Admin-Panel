import http from '../Interceptor/Interceptor';
import { toast } from 'react-toastify';

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditCourse = async (object) => {
  const result = await http.put(
    `${MainURL}course/${courseId}`,
    object
  );

  return result.data;
};
