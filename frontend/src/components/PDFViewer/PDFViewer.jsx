import { Document, Page, pdfjs } from "react-pdf";
import { Loading } from "@carbon/react";
import {} from "@carbon/icons-react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./PDFViewer.css"; // Optional for custom styles

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

function PdfViewer({
  file,
  numPages,
  setNumPages,
  pageNumber,
  setPageNumber,
  data,
  hoveredKey,
}) {
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const renderHighlights = () => {
    debugger;
    const extracted = data?.extraction_json_with_coordinates;
    if (!extracted) return null;

    return Object.entries(extracted)
      .filter(([key, val]) => val?.coordinates && val?.page_num === pageNumber)
      .map(([key, val]) => {
        const { x0, y0 } = val.coordinates;
        return (
          <div
            key={key}
            id={`pdf-${key}`}
            style={{
              position: "absolute",
              left: `${x0 * 100}%`,
              top: `${y0 * 100}%`,
              width: "10px",
              height: "10px",
              backgroundColor: "transparent",
            }}
          ></div>
        );
      });
  };

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
        <div style={{ position: "relative" }}>
          <Page pageNumber={pageNumber} height={window.innerHeight - 100} />
          {renderHighlights()}
        </div>
      </Document>
    </div>
  );
}

export default PdfViewer;
