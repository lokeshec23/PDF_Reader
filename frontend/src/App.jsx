import Header from "./components/Header/Header";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext.jsx";

import BankStatement from "./components/BankStatement/BankStatement.jsx";

const App = () => {
  const { themeStyle, jsonData, docType, setDocType } = useContext(UserContext);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <BankStatement />
    </div>
  );
};

export default App;
