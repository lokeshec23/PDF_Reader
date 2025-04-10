import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { TextInput, Button, Tile, Loading } from "@carbon/react";
import { NextOutline, PreviousOutline } from "@carbon/icons-react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./PDFViewer.css"; // Optional for custom styles

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={ <Loading />}
      >
        <Page
          pageNumber={pageNumber}
          height={window.innerHeight - 100} // Adjust if needed for header/footer
        />
      </Document>
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
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
    </div>
  );
}



export default PdfViewer;
