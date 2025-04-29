// import Header from "./components/Header/Header";
// import { UserContext } from "./context/UserContext.jsx";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import accessBlob from "./utils/accessBlob_.js";

const App = () => {
  // const {  } = useContext(UserContext);
  // useEffect(()=>{
  //   fetch('http://localhost:3000/getpdf?pdfFileName=1040.pdf')
  //   .then((response) => response.json())
  //   .then((pdfBlob) => {
  //       // const pdfUrl = URL.createObjectURL(pdfBlob);
  //       console.log(pdfBlob)
  //       // window.open(pdfUrl, '_blank');  // Open the PDF in a new tab
  //   })
  //   .catch((error) => console.error('Error fetching the PDF:', error));

  // },[])
  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <Routes>
        <Route path="/:docId" element={<MainLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
