import React, { useState, useEffect, Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

// ** Routes & Default Routes
import { getRoutes } from "./router/routes";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/authSlice";

const App = () => {
  const [allRoutes, setAllRoutes] = useState([]);

  const user = useSelector(selectCurrentUser);

  // ** Hooks
  const { layout } = useLayout();

  useEffect(() => {
    const userRoutes = getRoutes(layout, !!user);

    setAllRoutes(userRoutes);
  }, [layout, user]);

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  );
};

export default App;
