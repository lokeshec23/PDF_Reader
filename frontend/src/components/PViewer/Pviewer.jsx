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

import { BlobServiceClient } from "@azure/storage-blob";

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
  }, [selectedDocType]);

  const handlePDFChange = () => {
    try {
      // if (pdfPathMap[selectedDocType]) {
      //   setPDFLoad(pdfPathMap[selectedDocType](docId));
      // } else {
      //   console.error(
      //     "Unsupported document type for PDF loading:",
      //     selectedDocType
      //   );
      //   setPDFLoad(null);
      // }
      const account_name = "caincomecalcstr001";
      const account_key =
        "yRIfHBrTymbvEkU3VyYRfsW/QlGh+eJyH9R70le8vnVP4BXLUa1pFCzwZRHxO+MjDSL6zoGZR0c++ASt3VY/VQ==";
      const container_name = "ic-loandna";
      const pdfFileName = "1040.pdf";

      const fetchPdf = async () => {
        // const blobSasUrl = "https://caincomecalcstr001.blob.core.windows.net/ic-loandna/1040.pdf?yRIfHBrTymbvEkU3VyYRfsW/QlGh+eJyH9R70le8vnVP4BXLUa1pFCzwZRHxO+MjDSL6zoGZR0c++ASt3VY/VQ==";
        // const blobServiceClient = new BlobServiceClient(blobSasUrl);
        // const containerClient = blobServiceClient.getContainerClient(container_name);
        // const blobClient = containerClient.getBlobClient("1040.pdf");
        // const downloadBlockBlobResponse = await blobClient.download();
        const account_name = "caincomecalcstr001";
        const account_key =
          "yRIfHBrTymbvEkU3VyYRfsW/QlGh+eJyH9R70le8vnVP4BXLUa1pFCzwZRHxO+MjDSL6zoGZR0c++ASt3VY/VQ==";
        const container_name = "ic-loandna";

        // # This is usually like https://<account_name>.blob.core.windows.net
        const endpoint = `https://${account_name}.blob.core.windows.net`;

        // console.log("pdfFileName:", pdfFileName);
        // console.log("pdfFileName:", import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING);
        // console.log("pdfFileName:", import.meta.env.VITE_CONTAINER_NAME);

        // const blobServiceClient = BlobServiceClient.fromConnectionString(
        //   "DefaultEndpointsProtocol=https;AccountName=caincomecalcstr001;AccountKey=yRIfHBrTymbvEkU3VyYRfsW/QlGh+eJyH9R70le8vnVP4BXLUa1pFCzwZRHxO+MjDSL6zoGZR0c++ASt3VY/VQ==;EndpointSuffix=core.windows.net"
        // );
        // const containerClient = blobServiceClient.getContainerClient(
        //  "ic-loandna"
        // );

        // // for await (const blob of containerClient.listBlobsFlat()) {
        // //   console.log("Available blob:", blob.name);
        // //   const blobUrl = `${endpoint}/${container_name}/${blob.name}?${account_key}`;
        // //   console.log("Blob URL:", blobUrl);
        // // }
        // //AccountName=caincomecalcstr001;AccountKey=yRIfHBrTymbvEkU3VyYRfsW/QlGh+eJyH9R70le8vnVP4BXLUa1pFCzwZRHxO+MjDSL6zoGZR0c++ASt3VY/VQ==;EndpointSuffix=core.windows.net
        // const blockBlobClient = containerClient.getBlockBlobClient(pdfFileName);

        // const exists = await blockBlobClient.exists();
        // if (!exists) {
        //   console.error(`❌ File not found in blob storage: "${pdfFileName}"`);
        //   return;
        // }

        // console.log("✅ File exists in blob storage.");

        // const downloadResponse = await blockBlobClient.download();
        // const blob = await downloadResponse.blobBody;
        const response = await fetch(
          "https://caincomecalcstr001.blob.core.windows.net/ic-loandna/1040.pdf?yRIfHBrTymbvEkU3VyYRfsW/QlGh+eJyH9R70le8vnVP4BXLUa1pFCzwZRHxO+MjDSL6zoGZR0c++ASt3VY/VQ=="
        );
        const buffer = await response.arrayBuffer();
        // const arrayBuffer = await blob.arrayBuffer();
        setPDFLoad(buffer);
      };
      fetchPdf();
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
