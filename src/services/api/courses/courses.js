import http from '../../Interceptor/Interceptor';

const endpoint = 'https://api.madloops.sepehracademy.ir/api/';

export const getAllCourses = async () => {
  const courses = await http.get(`${endpoint}course/getall`);
  return courses;
};

export const getCourseById = async (courseId) => {
  const course = await http.get(`${endpoint}course/${courseId}`);
  return course;
};

export const deleteCourse = async (courseId) => {
  const courses = await http.delete(`${endpoint}course/${courseId}`);
  return courses;
};
