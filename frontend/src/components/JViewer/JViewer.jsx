import React, { useState } from "react";
import ReactJson from "react-json-view";
import {
  Tabs,
  Tab,
  Dropdown,
  TabList,
  TabPanels,
  TabPanel,
} from "@carbon/react";

const feedbackDates = ["2025-04-01", "2025-03-28", "2025-03-15", "2025-02-20"];

const jsonViewFucntion = (data) => {
  return (
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
  );
};

const JViewer = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{ margin: "1rem" }}>
      <Tabs>
        <TabList>
          <Tab>Json View</Tab>
          <Tab>Feedback History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{jsonViewFucntion(data)}</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default JViewer;
