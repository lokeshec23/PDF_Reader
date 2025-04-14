import { createContext, useState, useEffect } from "react";
import sampleJSON from "../data/sample.json";
import sampleJSON1 from "../data/14_04_20241_13_08.json";
import sampleJSON2 from "../data/14_04_20241_15_15.json";

// paystub json
import SamplePayStub from "../data/paystub/SamplePaystub.json";

// 1. Create the context
export const UserContext = createContext();

// 2. Create the provider component
export const UserProvider = ({ children }) => {
  const [themeStyle, setThemeStyle] = useState({ primary: "#4589ff" }); // Default theme is light
  const [jsonData, setJsonData] = useState(SamplePayStub);
  const [docType, setDocType] = useState("Bank Statement");
  const DOC_TYPES = [
    "Bank Statement",
    "Paystub",
    "W2",
    "Schedule E",
    "Credit report",
  ];
  const [selectedDocType, setSelectedDocType] = useState(DOC_TYPES[0]);
  const loadJson = (data) => {
    const finalJson = {
      default: sampleJSON,
      "2025-04-14-13-04": sampleJSON,
      "2025-03-28-04-05": sampleJSON1,
      "2025-02-19-10-11": sampleJSON2,
    };
    setJsonData(finalJson[data]);
  };

  useEffect(() => {
    if (selectedDocType === "Bank Statement") {
      setJsonData(sampleJSON); // import this at top
    } else if (selectedDocType === "Paystub") {
      setJsonData(SamplePayStub); // import this at top
    }
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
