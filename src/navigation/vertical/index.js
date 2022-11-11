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

// ** Merge & Export
export default [
  ...home,
  ...lessons,
  ...courses,
  ...employees,
  ...teachers,
  ...students,
  ...blogs,
  ...comments,
  ...profile,
];
