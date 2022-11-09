import axios from 'axios';

const endpoint = 'https://api.madloops.sepehracademy.ir/api/';

export const getAllCourses = async () => {
  const courses = await axios.get(`${endpoint}course/getall`);
  return courses;
};
