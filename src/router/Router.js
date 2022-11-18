// ** Router imports
import { useRoutes } from "react-router-dom";

const Router = ({ allRoutes }) => {
  // const x = JSON.parse(getItem("userInfo"));

  // allRoutes.map((da) => da[0]);
  // console.log(allRoutes);
  // if (x.role === "admin" || x.role === "teacher") {
  //   const routes = useRoutes(
  //     allRoutes.map((da) => da.children.filter((il) => il.auth === true))
  //   );
  //   return routes;
  // } else {
  //   const routes = useRoutes(
  //     allRoutes.map((da) => da.children.filter((il) => il.auth === false))
  //   );
  //   return routes;
  // }
  const routes = useRoutes([...allRoutes]);

  return routes;
};

export default Router;
