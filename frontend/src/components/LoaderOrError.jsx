import React from "react";
import { Loading } from "carbon-components-react";

const LoaderOrError = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading description="Active loading indicator" withOverlay={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center h-full text-red-600 font-bold"
        style={{ padding: "20px" }}
      >
        {error}
      </div>
    );
  }

  return <>{children}</>;
};

export default LoaderOrError;
