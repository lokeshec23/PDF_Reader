import React from "react";
import { Tile } from "carbon-components-react";
import { CodeSnippet } from "carbon-components-react";

const sampleData = {
  name: "ChatGPT",
  type: "AI Assistant",
  features: ["Text Generation", "Code Help", "Language Translation"],
};

const JViewer = () => {
  return (
    <Tile style={{ margin: "1rem" }}>
      <h4 style={{ marginBottom: "1rem" }}>JSON</h4>
      <CodeSnippet type="multi" feedback="Copied!" wrapText={true}>
        {JSON.stringify(sampleData, null, 2)}
      </CodeSnippet>
    </Tile>
  );
};

export default JViewer;
