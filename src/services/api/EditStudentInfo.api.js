import http from "../Interceptor/Interceptor";

const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditStudentInfo = async (object, studentId) => {
  try {
    const result = await http.put(`${MainURL}student/${studentId}`, object);

    return result.data;
  } catch (error) {
    return null;
  }
};
