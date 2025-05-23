// import Header from "./components/Header/Header";
// import { UserContext } from "./context/UserContext.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

const App = () => {
  // const {  } = useContext(UserContext);

  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
  
};

export default App;
