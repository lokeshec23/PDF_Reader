import React from "react";

const HighlightRect = ({ position, color = "rgba(255, 255, 0, 0.5)" }) => {
  if (!position) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
        backgroundColor: color,
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default HighlightRect;
