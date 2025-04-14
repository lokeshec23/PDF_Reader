import React, { useState, useContext } from "react";
import ReactJson from "react-json-view";
import {
  Tabs,
  Tab,
  Dropdown,
  TabList,
  TabPanels,
  TabPanel,
} from "@carbon/react";
import { UserContext } from "../../context/UserContext";

const feedbackDates = ["2025-04-01", "2025-03-28"];

const jsonViewFunction = (data) => {
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
  const { jsonData, loadJson } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{ margin: "1rem" }}>
      <Tabs
        onSelectionChange={(index) => {
          if (index === 0) {
            loadJson("jsonView"); // Load sample JSON
            setSelectedDate(null); // Clear selected date
          }
        }}
      >
        <TabList>
          <Tab>Json View</Tab>
          <Tab>Feedback History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{jsonViewFunction(jsonData)}</TabPanel>
          <TabPanel>
            <div style={{ marginBottom: "1rem", maxWidth: "300px" }}>
              <Dropdown
                id="feedback-dropdown"
                label="Select a date"
                items={feedbackDates}
                onChange={({ selectedItem }) => {
                  setSelectedDate(selectedItem);
                  loadJson(selectedItem);
                }}
              />
            </div>
            {selectedDate && jsonViewFunction(jsonData)}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default JViewer;
