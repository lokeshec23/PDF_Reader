import { createContext, useState, useEffect } from "react";
import sampleJSON from "../data/sample.json";
import sampleJSON1 from "../data/14_04_20241_13_08.json";
import sampleJSON2 from "../data/14_04_20241_15_15.json";

// paystub json
import SamplePayStub from "../data/paystub/SamplePaystub.json";
// import SamplePayStub1 from "../data/paystub/14_04_20241_13_08.json";
// import SamplePayStub2 from "../data/paystub/14_04_20241_15_15.json";

// 1. Create the context
export const UserContext = createContext();

// 2. Create the provider component
export const UserProvider = ({ children }) => {
  const [themeStyle, setThemeStyle] = useState({ primary: "#4589ff" }); // Default theme is light
  const [jsonData, setJsonData] = useState(SamplePayStub); // default to Paystub
  const [docType, setDocType] = useState("Bank Statement");
  const DOC_TYPES = [
    "Bank Statement",
    "Paystub",
    "W2",
    "Schedule E",
    "Credit report",
  ];
  const [selectedDocType, setSelectedDocType] = useState(DOC_TYPES[0]);

  // Store different feedback dates based on document type
  const feedbackDates = {
    "Bank Statement": [
      "2025-04-14-13-04",
      "2025-03-28-04-05",
      "2025-02-19-10-11",
    ],
    Paystub: [
      "2025-04-14-13-04",
      //  "2025-03-25-10-01", "2025-02-28-11-30"
    ],
  };

  const loadJson = (data) => {
    const finalJson = {
      "Bank Statement": {
        default: sampleJSON,
        "2025-04-14-13-04": sampleJSON,
        "2025-03-28-04-05": sampleJSON1,
        "2025-02-19-10-11": sampleJSON2,
      },
      Paystub: {
        default: SamplePayStub,
        "2025-04-14-13-04": SamplePayStub,
        // "2025-03-25-10-01": SamplePayStub1,
        // "2025-02-28-11-30": SamplePayStub2,
      },
    };
    setJsonData(finalJson[selectedDocType]?.[data]);
  };

  useEffect(() => {
    loadJson("default");
  }, [selectedDocType]);

  return (
    <UserContext.Provider
      value={{
        themeStyle,
        jsonData,
        loadJson,
        docType,
        setDocType,
        selectedDocType,
        setSelectedDocType,
        DOC_TYPES,
        feedbackDates: feedbackDates[selectedDocType], // Dynamically select dates based on docType
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
