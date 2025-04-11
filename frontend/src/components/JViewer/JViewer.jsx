// JViewer.jsx
import React from "react";
import { Tile } from "carbon-components-react";

const JViewer = ({ data, setHoveredKey }) => {
  const extracted = data.extraction_json_with_coordinates;

  return (
    <Tile style={{ margin: "1rem" }}>
      <h4 style={{ marginBottom: "1rem" }}>JSON Fields</h4>
      <div style={{ maxHeight: "700px", overflowY: "auto" }}>
        {Object.entries(extracted).map(([key, val]) => {
          const hasCoordinates = val?.coordinates !== null;
          return (
            <div
              key={key}
              id={hasCoordinates ? `json-${key}` : undefined}
              onMouseEnter={() => hasCoordinates && setHoveredKey(key)}
              onMouseLeave={() => hasCoordinates && setHoveredKey(null)}
              style={{
                padding: "6px 10px",
                borderBottom: "1px solid #eee",
                color: "inherit",
                cursor: "pointer",
                // color: hasCoordinates ? "inherit" : "#bbb",
                // cursor: hasCoordinates ? "pointer" : "default",
              }}
            >
              <strong>{key}</strong>: {val.value || "<no value>"}
            </div>
          );
        })}
      </div>
    </Tile>
  );
};

export default JViewer;
