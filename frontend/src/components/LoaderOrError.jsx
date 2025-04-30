import React from "react";
import { Loading, InlineNotification } from "carbon-components-react";

const LoaderOrError = ({ loading, error, children }) => {
 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading description="Loading content" withOverlay={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ padding: "20px" }}
      >
        <InlineNotification
          kind="error"
          title="Something went wrong"
          lowContrast={true}
          hideCloseButton={false}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoaderOrError;
