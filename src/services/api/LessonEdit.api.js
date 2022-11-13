import http from '../Interceptor/Interceptor';
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const LessonEdit = async (object, lessonId) => {
  console.log(object, lessonId);
  const result = await http.put(
    `${MainURL}lesson/${lessonId}`,
    object
  );

  return result.data;
};
