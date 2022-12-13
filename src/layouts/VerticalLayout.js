// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import { navigationAdmin, navigationTeacher } from "@src/navigation/vertical";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./../redux/authSlice";
import { useState } from "react";

const VerticalLayout = (props) => {
  const [navigation, setNavigation] = useState(navigationAdmin);

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      setNavigation(
        user.role === "admin" ? navigationAdmin : navigationTeacher
      );
    }
  }, [user]);

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
