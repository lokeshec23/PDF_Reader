import { Document, Page, pdfjs } from "react-pdf";
import { Loading } from "@carbon/react";
import {} from "@carbon/icons-react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./PDFViewer.css"; // Optional for custom styles

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

function PdfViewer({ file, numPages, setNumPages, pageNumber, setPageNumber }) {
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        flex: 1,
        // overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<Loading />}
      >
        <Page
          pageNumber={pageNumber}
          height={window.innerHeight - 100} // Adjust if needed for header/footer
          // onLoadSuccess={({ getTextContent }) =>
          //   checkIfImagePage(getTextContent)
          // }
        />
      </Document>
    </div>
  );
}

export default PdfViewer;
