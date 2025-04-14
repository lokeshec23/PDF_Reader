import Header from "./components/Header/Header";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext.jsx";

import MainLayout from "./components/MainLayout.jsx";

const App = () => {
  // const {  } = useContext(UserContext);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MainLayout />
    </div>
  );
};

export default App;
