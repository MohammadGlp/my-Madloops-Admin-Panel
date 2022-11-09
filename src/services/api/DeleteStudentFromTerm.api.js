import http from "../../Services/Interceptor/Interceptor";
import { getCurrentUser } from "../AuthServices/AuthServices";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const DeleteStudentFromTerm = async (termIdParam, termTitle) => {
  try {
    //Getting TermId From Table And Make It As An Ubject Same As Ubject That Api Want It ==> {termId:""}
    const data = { termId: termIdParam };

    //Getting Student Id From Local Storage Or Session Storage
    const studentInfo = getCurrentUser();

    //Calling Api To Delete The Current Student From Current Term ... !!!
    const result = await http.post(
      `${MainURL}term/removeStudentFromTerm/${studentInfo._id}`,
      data
    );

    //Condition To Displaying Success Massage To User If We Have A Result
    if (result) toast.warning(`دوره ${termTitle} از دوره های شما حذف شد`);

    return result;
  } catch (error) {
    console.log(error);
  }
};
