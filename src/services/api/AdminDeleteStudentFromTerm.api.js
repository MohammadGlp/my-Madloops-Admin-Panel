import http from "../../Services/Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AdminDeleteStudentFromTerm = async (termIdParam, studentId) => {
  try {
    //Getting TermId From Table And Make It As An Ubject Same As Ubject That Api Want It ==> {termId:""}
    const data = { termId: termIdParam };

    //Calling Api To Delete The Current Student From Current Term ... !!!
    const result = await http.post(
      `${MainURL}term/removeStudentFromTerm/${studentId}`,
      data
    );

    //Condition To Displaying Success Massage To User If We Have A Result
    if ((result.data.success = true)) toast.warning(`آیتم مورد نظر حذف شد`);

    return result;
  } catch (error) {
    console.log(error);
  }
};
