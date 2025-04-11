import React from "react";
import { Tile } from "carbon-components-react";
import ReactJson from "react-json-view";
import sampleData from "../../data/sample.json";

const JViewer = () => {
  return (
    <Tile style={{ margin: "1rem" }}>
      <h4 style={{ marginBottom: "1rem" }}>JSON</h4>
      <div style={{ maxHeight: "700px", overflowY: "auto" }}>
        <ReactJson
          src={sampleData}
          theme="rjv-default"
          name={null}
          collapsed={false}
          enableClipboard={true}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </div>
    </Tile>
  );
};

export default JViewer;
