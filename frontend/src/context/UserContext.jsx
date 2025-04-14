import { createContext, useState } from "react";
import sampleJSON from "../data/sample.json";
import sampleJSON1 from "../data/14_04_20241_13_08.json";
import sampleJSON2 from "../data/14_04_20241_15_15.json";
// 1. Create the context
export const UserContext = createContext();

// 2. Create the provider component
export const UserProvider = ({ children }) => {
  const [themeStyle, setThemeStyle] = useState({ primary: "#4589ff" }); // Default theme is light
  const [jsonData, setJsonData] = useState(sampleJSON);
  const [docType, setDocType] = useState("Bank Statement");
  const loadJson = (data) => {
    const finalJson = {
      default: sampleJSON,
      "2025-04-14-13-04": sampleJSON,
      "2025-03-28-04-05": sampleJSON1,
      "2025-02-19-10-11": sampleJSON2,
    };
    setJsonData(finalJson[data]);
  };

  return (
    <UserContext.Provider
      value={{ themeStyle, jsonData, loadJson, docType, setDocType }}
    >
      {children}
    </UserContext.Provider>
  );
};
