import React, { useState, useEffect, useContext } from "react";
import PDFViewer from "../PDFViewer/PDFViewer";
import {
  NextOutline,
  PreviousOutline,
  Rotate,
  WatsonHealthZoomPan,
  ZoomIn,
  ZoomOut,
  ZoomReset,
} from "@carbon/icons-react";
import { UserContext } from "../../context/UserContext.jsx";
import { useParams } from "react-router-dom";
import { pdfPathMap } from "../../config/pdfPathMap";

const PViewer = ({ hoveredKey, data, setPageRenderReady }) => {
  const { docId } = useParams();
  const { selectedDocType } = useContext(UserContext);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [PDFLoad, setPDFLoad] = useState(null);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const togglePan = () => setIsPanning((p) => !p);

  useEffect(() => {
    if (
      hoveredKey &&
      hoveredKey.pageNum != null &&
      hoveredKey.pageNum !== pageNumber
    ) {
      setPageNumber(hoveredKey.pageNum);
    }
  }, [hoveredKey?.pageNum]);

  useEffect(() => {
    setPageRenderReady(false);
  }, [pageNumber]);

  useEffect(() => {
    handlePDFChange();
  }, [selectedDocType, docId]);

  const handlePDFChange = () => {
    try {
      fetch(`http://localhost:3000/getpdf?pdfFileName=${docId}.pdf`)
        .then((response) => response.json())
        .then((pdfBlob) => {
            // const pdfUrl = URL.createObjectURL(pdfBlob);
            console.log(pdfBlob)
            setPDFLoad(`data:application/pdf;base64,${pdfBlob.fileBuffer}`)
            // window.open(pdfUrl, '_blank');  // Open the PDF in a new tab
        })
        .catch((error) => console.error('Error fetching the PDF:', error));
      if (pdfPathMap[selectedDocType]) {
        // setPDFLoad(pdfPathMap[selectedDocType](docId));
        // setPDFLoad(pdfPathMap[selectedDocType](docId));
      } else {
        console.error(
          "Unsupported document type for PDF loading:",
          selectedDocType
        );
        setPDFLoad(null);
      }
    } catch (ex) {
      console.error("Error setting PDF path", ex);
    }
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
    setIsPanning(false);
  };

  const handleMouseDown = (e) => {
    if (!isPanning) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startOffset = { ...offset };

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setOffset({ x: startOffset.x + dx, y: startOffset.y + dy });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const showResetButton =
    zoom !== 1 || rotation !== 0 || offset.x !== 0 || offset.y !== 0;

  // ⭐ This part is NEW ⭐
  useEffect(() => {
    if (docId?.startsWith("122")) {
      setZoom((z) => Math.max(z - 0.1, 0.1)); // Zoom out once
    }
  }, [docId]);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          margin: "10px 20px",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <ZoomIn onClick={handleZoomIn} />
          <ZoomOut onClick={handleZoomOut} />
          <WatsonHealthZoomPan onClick={togglePan} />
          <Rotate onClick={handleRotate} />
          {showResetButton && <ZoomReset onClick={handleReset} />}
        </div>
        <div
          style={{
            gap: "1rem",
            display: "flex",
            marginTop: "10px",
          }}
        >
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

      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "relative",
          cursor: isPanning ? "grab" : "default",
          height: "90dvh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${offset.x}px, ${offset.y}px)`,
            transformOrigin: "top center",
            transition: isPanning ? "none" : "transform 0.3s ease",
          }}
        >
          <PDFViewer
            file={PDFLoad}
            numPages={numPages}
            setNumPages={setNumPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            data={data}
            hoveredKey={hoveredKey.key}
            scale={zoom}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PViewer;
