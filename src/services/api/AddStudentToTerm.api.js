import http from "../../Services/Interceptor/Interceptor";
import { getCurrentUser } from "../AuthServices/AuthServices";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const AddStudentToTerm = async (termIdParam, termTitle) => {
  try {
    //Getting TermId From Table And Make It As An Ubject Same As Ubject That Api Want It ==> {termId:""}
    const data = { termId: termIdParam };

    //Getting Student Id From Local Storage Or Session Storage
    const studentInfo = getCurrentUser();

    //Calling Api To Add The Current Student To Current Term ... !!!
    const result = await http.post(
      `${MainURL}term/addStudentToTerm/${studentInfo._id}`,
      data
    );

    //Condition To Displaying Success Massage To User If We Have A Result
    if (result) toast.success(`دوره ${termTitle} به دوره های شما افزوده شد`);

    return result;
  } catch (error) {
    console.log(error);
  }
};
