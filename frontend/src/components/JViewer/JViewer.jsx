import React from "react";
import ReactJson from "react-json-view";

const JViewer = ({ data }) => {
  return (
    <div style={{ margin: "1rem" }}>
      <h4 style={{ marginBottom: "1rem" }}> JSON View</h4>
      <div
        style={{
          overflowY: "auto",
          maxHeight: "80dvh",
          fontSize: "var(--cds-body-compact-01-font-size, .875rem)",
          fontWeight: "var(--cds-body-compact-01-font-weight, 400)",
          lineHeight: " var(--cds-body-compact-01-line-height, 1.28572)",
        }}
      >
        <ReactJson
          src={data}
          name={false}
          collapsed={2}
          enableClipboard={false}
          displayDataTypes={false}
          style={{ fontSize: "14px" }}
        />
      </div>
    </div>
  );
};

export default JViewer;
