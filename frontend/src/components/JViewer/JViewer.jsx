import React from "react";
import { Tile } from "carbon-components-react";

const JViewer = ({ data, setHoveredKey }) => {
  const extracted = data.extraction_json_with_coordinates;

  const renderField = (key, val) => {
    const hasCoordinates =
      val?.coordinates !== null && val?.coordinates !== undefined;
    return (
      <div
        key={key}
        id={hasCoordinates ? `json-${key}` : undefined}
        onMouseEnter={() =>
          hasCoordinates && setHoveredKey({ key, pageNum: val.page_num })
        }
        onMouseLeave={() =>
          hasCoordinates && setHoveredKey({ key: null, pageNum: null })
        }
        style={{
          padding: "6px 10px",
          lineHeight: "1.5",
          cursor: hasCoordinates ? "pointer" : "default",
        }}
      >
        <strong>{key}</strong>: {val.value || "<no value>"}
      </div>
    );
  };

  const renderTransactions = (transactions) => {
    return transactions.map((transaction, index) => (
      <div
        key={`transaction-${index}`}
        style={{ paddingLeft: "1rem", borderBottom: "1px dashed #ccc" }}
      >
        <strong>Transaction {index + 1}</strong>
        {Object.entries(transaction).map(([subKey, subVal]) => {
          const fullKey = `${subKey}-${index}`;
          return renderField(fullKey, subVal);
        })}
      </div>
    ));
  };

  return (
    <div style={{ margin: "1rem" }}>
      <h4 style={{ marginBottom: "1rem" }}>JSON Fields</h4>
      <div
        style={{
          overflowY: "auto",
          maxHeight: "80dvh",
          fontSize: "var(--cds-body-compact-01-font-size, .875rem)",
          fontWeight: "var(--cds-body-compact-01-font-weight, 400)",
          lineHeight: " var(--cds-body-compact-01-line-height, 1.28572)",
        }}
      >
        {Object.entries(extracted).map(([key, val]) => {
          if (key === "transactions" && Array.isArray(val)) {
            return renderTransactions(val);
          } else {
            return renderField(key, val);
          }
        })}
      </div>
    </div>
  );
};

export default JViewer;
