import { schemaMap } from "../config/schemaMap.js";
import { Dropdown } from "carbon-components-react";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { RightPanelCloseFilled, RightPanelOpen } from "@carbon/icons-react";

import Xarrow from "react-xarrows";
import JViewer from "./JViewer/JViewer.jsx";
import PViewer from "./PViewer/Pviewer.jsx";
import GenericInputFields from "./GenericInputFields.jsx";

import { useParams } from "react-router-dom";
import LoaderOrError from "./LoaderOrError.jsx";
const MainLayout = () => {
  const { docId } = useParams();
  const {
    themeStyle,
    jsonData,
    selectedDocType,
    setSelectedDocType,
    DOC_TYPES,
    setDocId,
  } = useContext(UserContext);

  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState({ key: null, pageNum: null });
  const [pageRenderReady, setPageRenderReady] = useState(false);

  useEffect(() => {
    console.log("Doc ID from URL:", docId);
    setDocId(docId);
  }, [docId]);

  useEffect(() => {
    console.log("Doc ID from URL:", docId);
    setDocId(docId);
  }, [docId]);

  useEffect(() => {
    console.log("jsonData in MainLayout:", jsonData); // 👈 Add this
  }, [jsonData]);

  const extractionData = jsonData?.extraction_json || {};

  const toggleRightPanel = () => {
    setIsRightPanelOpen((prev) => !prev);
  };

  const displayContent = (type) => {
    const schema = schemaMap[type];
    if (!schema)
      return (
        <div
          style={{
            padding: "10px 20px",
          }}
        >
          <p>We are working on this document type</p>
        </div>
      );

    return (
      <GenericInputFields
        data={jsonData}
        schema={schema}
        setHoveredKey={setHoveredKey}
      />
    );
  };

  return (
    <div
      className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 overflow-hidden"
      style={{
        padding: "10px 20px",
        // marginTop: "3%" "To hide the header"
      }}
    >
      {/* Left Side - PViewer */}
      <div className="w-full md:w-1/2">
        {/* <div className="flex flex-row justify-between items-center mb-2 px-2">
          <p>
            Loan ID: <b style={{ color: themeStyle.primary }}>{"9014960"}</b>
          </p>
          <p>
            Borrower Name:{" "}
            <b style={{ color: themeStyle.primary }}>
              {extractionData?.["Account Holder"] || "BOWWEN F DIAMOND"}
            </b>
          </p>
        </div> */}

        <div
          className="border rounded-2xl shadow-md p-4 bg-white"
          style={{ height: "90dvh", overflow: "auto" }}
        >
          <LoaderOrError
            loading={!jsonData || !jsonData.extraction_json}
            error={
              !selectedDocType || !schemaMap[selectedDocType]
                ? "Unsupported document type"
                : null
            }
          >
            <PViewer
              hoveredKey={hoveredKey}
              data={jsonData}
              setPageRenderReady={setPageRenderReady}
            />
          </LoaderOrError>
        </div>
      </div>

      {/* Right Side - InputFields and Optional JViewer */}
      <div className="w-full md:w-1/2 flex flex-row gap-4">
        {/* Left side of the split - InputFields */}
        <div
          className={`transition-all duration-300 ${
            isRightPanelOpen ? "w-1/2" : "w-full"
          }`}
        >
          <div
            className="border rounded-2xl shadow-md p-4 bg-white"
            style={{ height: "90dvh", marginTop: "1%", overflowY: "auto" }}
          >
            <div
              className="flex justify-end mb-2 "
              style={{ padding: "10px 20px" }}
            >
              {!isRightPanelOpen ? (
                <RightPanelOpen
                  size={24}
                  onClick={toggleRightPanel}
                  className="cursor-pointer"
                />
              ) : (
                <RightPanelCloseFilled
                  size={24}
                  onClick={toggleRightPanel}
                  className="cursor-pointer"
                />
              )}
            </div>
            <div
              style={{
                padding: "10px 20px",
              }}
            >
              <Dropdown
                id="inline"
                titleText="Document Type"
                initialSelectedItem={selectedDocType}
                label={selectedDocType}
                items={DOC_TYPES}
                onChange={({ selectedItem }) =>
                  setSelectedDocType(selectedItem)
                }
              />
            </div>
            <LoaderOrError
              loading={!jsonData || !jsonData.extraction_json}
              error={
                !selectedDocType || !schemaMap[selectedDocType]
                  ? "Unsupported document type"
                  : null
              }
            >
              {displayContent(selectedDocType)}
            </LoaderOrError>
          </div>
        </div>

        {/* Right panel - JViewer */}
        {isRightPanelOpen && (
          <div
            className="w-1/2 border rounded-2xl shadow-md p-4 bg-white transition-all duration-300"
            style={{ height: "100%" }}
          >
            <LoaderOrError
              loading={!jsonData || !jsonData.extraction_json}
              error={
                !selectedDocType || !schemaMap[selectedDocType]
                  ? "Unsupported document type"
                  : null
              }
            >
              <JViewer data={jsonData} />
            </LoaderOrError>
          </div>
        )}
      </div>

      {/* Arrow between JSON and PDF */}
      {hoveredKey.key && (
        <Xarrow
          start={`json-${hoveredKey.key}`}
          end={`pdf-${hoveredKey.key}`}
          color={themeStyle.primary}
          strokeWidth={2}
          // // animateDrawing={true} // This makes the arrow smooth!
          // showHead={true} //   show a nice arrowhead
          // path="smooth" // "smooth" path instead of straight line
          // curveness={0.8} // 0 to 1 — how much curve you want
          // headSize={5} // size of arrow head
        />
      )}
    </div>
  );
};

export default MainLayout;
