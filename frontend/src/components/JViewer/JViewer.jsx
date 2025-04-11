// // JViewer.jsx
// import React from "react";
// import { Tile } from "carbon-components-react";

// const JViewer = ({ data, setHoveredKey }) => {
//   const extracted = data.extraction_json_with_coordinates;

//   return (
//     <Tile style={{ margin: "1rem" }}>
//       <h4 style={{ marginBottom: "1rem" }}>JSON Fields</h4>
//       <div style={{ maxHeight: "700px", overflowY: "auto" }}>
//         {Object.entries(extracted).map(([key, val]) => {
//           const hasCoordinates = val?.coordinates !== null;
//           return (
//             <div
//               key={key}
//               id={hasCoordinates ? `json-${key}` : undefined}
//               onMouseEnter={() => hasCoordinates && setHoveredKey(key)}
//               onMouseLeave={() => hasCoordinates && setHoveredKey(null)}
//               style={{
//                 padding: "6px 10px",
//                 borderBottom: "1px solid #eee",
//                 color: "inherit",
//                 cursor: "pointer",
//                 // color: hasCoordinates ? "inherit" : "#bbb",
//                 // cursor: hasCoordinates ? "pointer" : "default",
//               }}
//             >
//               <strong>{key}</strong>: {val.value || "<no value>"}
//             </div>
//           );
//         })}
//       </div>
//     </Tile>
//   );
// };

// export default JViewer;
// JViewer.jsx
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
        onMouseEnter={() => hasCoordinates && setHoveredKey(key)}
        onMouseLeave={() => hasCoordinates && setHoveredKey(null)}
        style={{
          padding: "6px 10px",
          borderBottom: "1px solid #eee",
          color:  "inherit",
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
        {Object.entries(transaction).map(([subKey, subVal]) =>
          renderField(`${subKey}-${index}`, subVal)
        )}
      </div>
    ));
  };

  return (
    <Tile style={{ margin: "1rem" }}>
      <h4 style={{ marginBottom: "1rem" }}>JSON Fields</h4>
      <div style={{ maxHeight: "700px", overflowY: "auto" }}>
        {Object.entries(extracted).map(([key, val]) => {
          if (key === "transactions" && Array.isArray(val)) {
            return renderTransactions(val);
          } else {
            return renderField(key, val);
          }
        })}
      </div>
    </Tile>
  );
};

export default JViewer;
