import { Document, Page, pdfjs } from "react-pdf";
import { Loading } from "@carbon/react";
import {} from "@carbon/icons-react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./PDFViewer.css"; // Optional for custom styles
import { schemaMap } from "../../config/schemaMap";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true); // Track loading manually

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false); //  After loading done
  };

  const renderHighlights = () => {
    const extracted =
      data?.extraction_json_with_coordinates || data?.extraction_json;
    if (!extracted) return null;

    const highlightElements = [];

    for (const [key, val] of Object.entries(extracted)) {
      // Case 1: It's an array like transactions or W2
      if (Array.isArray(val)) {
        val.forEach((item, index) => {
          // Case 1a: Entire item has coordinates (like W2)
          if (item?.coordinates && item?.page_num === pageNumber) {
            const { x0, y0 } = item.coordinates;

            // Optional: Choose a main field for ID — default to key-index
            const primaryField =
              schemaMap[data.doc_type]?.sectionFields?.[0] || key;

            highlightElements.push(
              <div
                key={`${primaryField}-${index}`}
                id={`pdf-${primaryField}-${index}`}
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

          // Case 1b: Item has nested fields with coordinates (Bank Statement)
          Object.entries(item || {}).forEach(([subKey, subVal]) => {
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
      }

      // Case 2: Flat field like Employer Name
      else if (val?.coordinates && val?.page_num === pageNumber) {
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", //  important to center
        minHeight: "80vh", // Give enough height for center alignment
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <Loading withOverlay={false} />
        </div>
      )}

      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => {
          console.error("PDF Load Error", error);
          setIsLoading(false); // Even on error, stop loading
        }}
        loading={null}
      >
        <div style={{ position: "relative" }}>
          <Page
            pageNumber={pageNumber}
            scale={scale || 1.5}
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
