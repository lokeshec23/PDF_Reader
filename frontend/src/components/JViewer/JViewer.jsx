import React, { useState, useContext, useEffect } from "react";
import ReactJson from "react-json-view";
import {
  Tabs,
  Tab,
  Dropdown,
  TabList,
  TabPanels,
  TabPanel,
  InlineNotification,
} from "@carbon/react";
import { UserContext } from "../../context/UserContext";

const jsonViewFunction = (data, action) => {
  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight: action === "default" ? "80dvh" : "75dvh",
        fontSize: "var(--cds-body-compact-01-font-size, .875rem)",
        fontWeight: "var(--cds-body-compact-01-font-weight, 400)",
        lineHeight: "var(--cds-body-compact-01-line-height, 1.28572)",
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
  const {
    jsonData,
    loadJson,
    selectedDocType,
    feedbackDates,
    setSelectedDocType,
    
  } = useContext(UserContext);
  console.log("LL", jsonData);
  const [selectedDate, setSelectedDate] = useState(feedbackDates[0]);
  const [tabIndex, setTabIndex] = useState(0); // Control tab index
  const [isEmptyJson, setIsEmptyJson] = useState(false);

  useEffect(() => {
    debugger
    if (Object.keys(jsonData).length == 0) {
      setIsEmptyJson(true);
    }
  }, [jsonData]);

  const handleTabChange = ({ selectedIndex }) => {
    setTabIndex(selectedIndex);
    if (selectedIndex === 0) {
      loadJson("default");
      setSelectedDate(feedbackDates[0]);
    }
  };

  return (
    <>
      {isEmptyJson ? (
        <div
          className="flex items-center justify-center h-full"
          style={{ padding: "20px" }}
        >
          <InlineNotification
            kind="warning"
            title="Json not generated"
            subtitle={"Please try after sometime or contact administrator"}
            lowContrast
            hideCloseButton={true}
          />
        </div>
      ) : (
        <div style={{ margin: "1rem" }}>
          <Tabs selectedIndex={tabIndex} onChange={handleTabChange}>
            <TabList>
              <Tab>Json View</Tab>
              <Tab>Feedback History</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>{jsonViewFunction(jsonData, "default")}</TabPanel>
              <TabPanel>
                <div style={{ marginBottom: "1rem", maxWidth: "300px" }}>
                  <Dropdown
                    id="feedback-dropdown"
                    label="Select a date"
                    items={feedbackDates}
                    selectedItem={selectedDate}
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
      )}
    </>
  );
};

export default JViewer;
