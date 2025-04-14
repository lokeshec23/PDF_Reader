import JViewer from "../JViewer/JViewer";
import PViewer from "../PViewer/Pviewer";
import InputFields from "../InputFields/InputFields";
import { RightPanelCloseFilled, RightPanelOpen } from "@carbon/icons-react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import Xarrow from "react-xarrows";

const BankStatement = () => {
  const { themeStyle, jsonData } = useContext(UserContext);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState({ key: null, pageNum: null });
  const [pageRenderReady, setPageRenderReady] = useState(false);

  const extractionData = jsonData?.extraction_json || {};

  const toggleRightPanel = () => {
    setIsRightPanelOpen((prev) => !prev);
  };
  return (
    <div
      className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 overflow-hidden"
      style={{ padding: "10px 20px", marginTop: "3%" }}
    >
      {/* Left Side - PViewer */}
      <div className="w-full md:w-1/2">
        <div className="flex flex-row justify-between items-center mb-2 px-2">
          <p>
            Loan ID:{" "}
            <b style={{ color: themeStyle.primary }}>
              {extractionData?.["Account Number"]}
            </b>
          </p>
          <p>
            Borrower Name:{" "}
            <b style={{ color: themeStyle.primary }}>
              {extractionData?.["Account Holder"]}
            </b>
          </p>
        </div>

        <div className="border rounded-2xl shadow-md p-4 bg-white">
          <PViewer
            hoveredKey={hoveredKey}
            data={jsonData}
            setPageRenderReady={setPageRenderReady}
          />
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
          <div className="flex justify-end mb-2 pr-2">
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
          <div className="border rounded-2xl shadow-md p-4 bg-white">
            <InputFields data={jsonData} setHoveredKey={setHoveredKey} />
          </div>
        </div>

        {/* Right panel - JViewer */}
        {isRightPanelOpen && (
          <div
            className="w-1/2 border rounded-2xl shadow-md p-4 bg-white transition-all duration-300"
            style={{ height: "100%" }}
          >
            <JViewer data={jsonData} />
          </div>
        )}
      </div>
      {hoveredKey.key && (
        <Xarrow
          start={`json-${hoveredKey.key}`}
          end={`pdf-${hoveredKey.key}`}
          color={themeStyle.primary}
          strokeWidth={2}
        />
      )}
    </div>
  );
};

export default BankStatement;
