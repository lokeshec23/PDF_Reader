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
  scale,
}) {
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const renderHighlights = () => {
    const extracted = data?.extraction_json_with_coordinates;
    if (!extracted) return null;

    const highlightElements = [];

    for (const [key, val] of Object.entries(extracted)) {
      if (key === "transactions" && Array.isArray(val)) {
        val.forEach((transaction, index) => {
          Object.entries(transaction).forEach(([subKey, subVal]) => {
            if (subVal?.coordinates && subVal?.page_num === pageNumber) {
              const { x0, y0 } = subVal.coordinates;
              highlightElements.push(
                <div
                  key={`${subKey}-${index}`}
                  id={`pdf-${subKey}-${index}`}
                  style={{
                    position: "absolute",
                    left: `${x0 * 100}%`,
                    top: `${y0 * 100}%`,
                    width: "10px",
                    height: "10px",
                    backgroundColor: "transparent",
                  }}
                />
              );
            }
          });
        });
      } else if (val?.coordinates && val?.page_num === pageNumber) {
        const { x0, y0 } = val.coordinates;
        highlightElements.push(
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
          />
        );
      }
    }

    return highlightElements;
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
          <Page
            pageNumber={pageNumber}
            // height={window.innerHeight - 100}
            scale={scale || 1.5} // Default to 1.5 if not passed
            renderAnnotationLayer={false}
            renderTextLayer={true}
          />
          {renderHighlights()}
        </div>
      </Document>
    </div>
  );
}

export default PdfViewer;
