import React from "react";
import PDFViewer from "../PDFViewer/PDFViewer";

const PViewer = () => {
  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <PDFViewer file="/sample.pdf"/> 
    </div>
  );
};

export default PViewer;
