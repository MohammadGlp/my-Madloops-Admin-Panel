import http from "../../Services/Interceptor/Interceptor";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AdminAddStudentToTerm = async (termIdParam, studentId) => {
  try {
    //Getting TermId From Table And Make It As An Ubject Same As Ubject That Api Want It ==> {termId:""}
    const data = { termId: termIdParam };

    //Calling Api To Add The Current Student To Current Term ... !!!
    const result = await http.post(
      `${MainURL}term/addStudentToTerm/${studentId}`,
      data
    );

    //Condition To Displaying Success Massage To User If We Have A Result
    if (result) toast.success(`دوره مورد نظر افزوده شد`);

    return result;
  } catch (error) {
    console.log(error);
  }
};
