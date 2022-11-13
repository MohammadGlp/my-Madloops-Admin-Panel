// ** Router imports
import { useRoutes } from "react-router-dom";

const Router = ({ allRoutes }) => {
  // const er = [...allRoutes].filter((data) =>
  //   data.children.map((da) => da).filter((fa) => fa.auth === true)
  // );
  const routes = useRoutes([...allRoutes]);

  return routes;
};

export default Router;
