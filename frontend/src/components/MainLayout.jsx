import { schemaMap } from "../config/schemaMap.js";
import { Dropdown, InlineNotification } from "carbon-components-react";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { RightPanelCloseFilled, RightPanelOpen } from "@carbon/icons-react";

import Xarrow from "react-xarrows";
import JViewer from "./JViewer/JViewer.jsx";
import PViewer from "./PViewer/Pviewer.jsx";
import GenericInputFields from "./GenericInputFields.jsx";

import { useParams } from "react-router-dom";
import LoaderOrError from "./LoaderOrError.jsx";
import { allowedDocIds } from "../config/allowedDocIds.js";

const MainLayout = () => {
  const { docId } = useParams();
  const {
    themeStyle,
    jsonData,
    selectedDocType,
    setSelectedDocType,
    docTypeList,
    setDocId,
  } = useContext(UserContext);

  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState({ key: null, pageNum: null });
  const [pageRenderReady, setPageRenderReady] = useState(false);
  const [docIdError, setDocIdError] = useState(null);
   const [jsonLoading, setJsonLoading] = useState({json: true})
  useEffect(() => {
    setDocId(docId);
    if (!allowedDocIds.includes(docId)) {
      setDocIdError("Please check your Loan ID.");
    } else {
      setDocIdError(null);
    }

  }, [docId]);

  useEffect(()=>{
    handleLoadingJson()
  },[jsonData])

  const extractionData = jsonData?.extraction_json || {};

  const toggleRightPanel = () => {
    setIsRightPanelOpen((prev) => !prev);
  };

  const handleLoadingJson = () => {
    try{
        if(Object.keys(jsonData).length) {
          setJsonLoading((prev)=>({...prev, json: false}))
        }
    }catch(ex){
      console.log("Error in handleLoading fun", ex)
    }
  }

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
    <>
      {/* {docIdError ? (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            width: "auto", // Important for InlineNotification
            maxWidth: "300px", // Optional to keep it neat
          }}
        >
          <InlineNotification
            kind="warning"
            title="Invalid Loan ID"
            subtitle={docIdError}
            lowContrast
            hideCloseButton={false}
          />
        </div>
      ) : (
      )} */}
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
              style={{ overflow: "hidden", height: "95dvh", marginTop: "1%" }}
            >
              {/* <LoaderOrError
                loading={!jsonData || !jsonData.extraction_json}
                error={
                  !selectedDocType || !schemaMap[selectedDocType]
                    ? "Unsupported document type"
                    : null
                }
              > */}
                <PViewer
                  hoveredKey={hoveredKey}
                  data={jsonData}
                  setPageRenderReady={setPageRenderReady}
                />
              {/* </LoaderOrError> */}
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
                style={{ height: "95dvh", marginTop: "1%", overflowY: "auto" }}
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
                    items={docTypeList}
                    onChange={({ selectedItem }) => {
                      debugger
                      setSelectedDocType(selectedItem)
                    }
                    }
                  />
                </div>
                {/* <LoaderOrError
                  loading={!jsonData || !jsonData.extraction_json}
                  error={
                    !selectedDocType || !schemaMap[selectedDocType]
                      ? "Unsupported document type"
                      : null
                  }
                > */}
                  {displayContent(selectedDocType)}
                {/* </LoaderOrError> */}
              </div>
            </div>

            {/* Right panel - JViewer */}
            {isRightPanelOpen && (
              <div
                className="w-1/2 border rounded-2xl shadow-md p-4 bg-white transition-all duration-300"
                style={{ height: "100%" }}
              >
                {/* <LoaderOrError
                  loading={jsonLoading.loading}
                  error={jsonLoading.error}
                  isFrom = 'JSON'
                > */}
                  <JViewer data={jsonData} />
                {/* </LoaderOrError> */}
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
    </>
  );
};

export default MainLayout;
