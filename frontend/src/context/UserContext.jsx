import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [themeStyle, setThemeStyle] = useState({ primary: "#4589ff" });

  const [docId, setDocId] = useState(null); // from URL param
  const [jsonData, setJsonData] = useState({});
  const [selectedDocType, setSelectedDocType] = useState("Paystub");

  const DOC_TYPES = [
    "Paystub",
    "W2",
    "Bank Statement",
    "Credit Report",
    "WVOE",
  ];

  const feedbackDates = {
    "Bank Statement": [
      "2025-04-14-13-04",
      "2025-03-28-04-05",
      "2025-02-19-10-11",
    ],
    Paystub: ["2025-04-14-13-04"],
  };

  const handleJSONChange = async () => {
    if (!docId) return;

    try {
      let jsonPath = "";
      switch (selectedDocType) {
        case "Bank Statement":
          jsonPath = `/${docId}/json/ic_${docId}_bankstatement.json`;
          break;
        case "Paystub":
          jsonPath = `/${docId}/json/ic_${docId}_paystub.json`;
          break;
        case "W2":
          jsonPath = `/${docId}/json/ic_${docId}_w2.json`;
          break;
        case "Credit Report":
          jsonPath = `/${docId}/json/ic_${docId}_creditreport.json`;
          break;
        case "WVOE":
          jsonPath = `/${docId}/json/ic_${docId}_wvoe.json`;
          break;
        default:
          jsonPath = `/${docId}/json/ic_${docId}_paystub.json`;
      }

      // console.log("📥 Fetching JSON:", jsonPath);
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error(`JSON not found at ${jsonPath}`);
      const json = await res.json();
      setJsonData(json);
    } catch (err) {
      console.error("❌ Error loading JSON:", err);
      setJsonData({});
    }
  };

  useEffect(() => {
    if (docId) handleJSONChange();
  }, [docId, selectedDocType]);

  return (
    <UserContext.Provider
      value={{
        themeStyle,
        docId,
        setDocId,
        jsonData,
        setJsonData,
        selectedDocType,
        setSelectedDocType,
        DOC_TYPES,
        feedbackDates: feedbackDates[selectedDocType] || [],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
