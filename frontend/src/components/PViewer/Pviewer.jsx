import React, { useState } from "react";
import PDFViewer from "../PDFViewer/PDFViewer";
import { NextOutline, PreviousOutline } from "@carbon/icons-react";
const PViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <React.Fragment>
      <div
        style={{
          height: "80dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <PDFViewer
          file="/sample.pdf"
          numPages={numPages}
          setNumPages={setNumPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
      <div style={{  display: "flex", gap: "1rem", display: "flex", justifyContent: "center" }}>
        <PreviousOutline
          onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
        />
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <NextOutline
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
        />
      </div>
    </React.Fragment>
  );
};

export default PViewer;
