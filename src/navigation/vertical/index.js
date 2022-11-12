// ** Navigation imports
import home from "./home";
import courses from "./courses";
import profile from "./profile";
import students from "./students";
import teachers from "./teachers";
import employees from "./employees";
import blogs from "./blogs";
import comments from "./comments";
import lessons from "./lessons";
import { getItem } from "../../services/storage/storage";

const currentUser = getItem("userInfo");
const x = JSON.parse(currentUser);

// ** Merge & Export
export default x.role === "admin"
  ? [
      ...home,
      ...lessons,
      ...courses,
      ...employees,
      ...teachers,
      ...students,
      ...blogs,
      ...comments,
      ...profile,
    ]
  : x.role === "teacher" && [
      ...home,
      ...lessons,
      ...courses,
      ...blogs,
      ...comments,
      ...profile,
    ];
