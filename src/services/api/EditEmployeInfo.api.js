import http from "../Interceptor/Interceptor";
import { getCurrentUser } from "../AuthServices/AuthServices";
import { setItem, sessionSetItem } from "../Storage/Storage";
import { toast } from "react-toastify";

//Main Url Of Our Project Backend
const MainURL = process.env.REACT_APP_PUBLIC_API_URL;

export const EditEmployeeInfo = async (object, refreshEmployeeInfo) => {
  try {
    const employeeInfo = getCurrentUser();
    //This If & Else Statement Check ::
    //If The User Set Some Repetitive Information ==> Error Will Be Display & Requset Will Not Send To Api
    //Else The User Set Some Unique Information ==> Requset Will Be Send To Api & Informations Will Be Updated
    if (
      object.fullName === employeeInfo.fullName &&
      object.email === employeeInfo.email &&
      object.address === employeeInfo.address &&
      object.phoneNumber === employeeInfo.phoneNumber &&
      object.nationalId === employeeInfo.nationalId &&
      object.birthDate === employeeInfo.birthDate
    ) {
      toast.error("اطلاعات وارد شده تکراری است");
    } else {
      const result = await http.put(
        `${MainURL}employee/${employeeInfo._id}`,
        object
      );
      // Access The Result Of Our Request
      const newInfo = result.data.result;

      // Making An Ubject Base On Our Result Data (Base On What We Need To Update + Employee Role & Id)
      const info = {
        fullName: newInfo.fullName,
        email: newInfo.email,
        address: newInfo.address,
        phoneNumber: newInfo.phoneNumber,
        nationalId: newInfo.nationalId,
        birthDate: newInfo.birthDate,
        _id: newInfo._id,
        role: newInfo.role,
      };

      // Set Our Object In Storage :: If The Key Is Same As A key That We Set Before In SetItem (Key = userInfo)
      // The Storage Will Be Updated Base On New Result Or New Object (New Result Or New Object = info)
      // ==> userInfo Is Updated Base On info
      setItem("userInfo", JSON.stringify(info)) ||
        sessionSetItem("userInfo", JSON.stringify(info));

      toast.success("تغییرات با موفقیت ثبت شد");
      setTimeout(() => {
        refreshEmployeeInfo((old) => !old);
      }, 5000);

      return result.data;
    }
  } catch (error) {
    //console.log(error);
    return null;
  }
};
