import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { docId: docIdFromParams } = useParams(); // Rename here
  const [themeStyle, setThemeStyle] = useState({ primary: "#4589ff" });
  const [docId, setDocId] = useState(docIdFromParams || null);
  const [jsonData, setJsonData] = useState({});
  const [selectedDocType, setSelectedDocType] = useState("");
  const [docTypeList, setDocTypeList] = useState([]); // New for dynamic types

  const feedbackDates = {
    "Bank Statement": [
      "2025-04-14-13-04",
      "2025-03-28-04-05",
      "2025-02-19-10-11",
    ],
    Paystub: ["2025-04-14-13-04"],
  };

  const docTypeMap = {
    "3188332_demo": ["Bank Statement"], 
    "1040": ["1040"],                        
  };
  
  useEffect(function () {
    
    if (!docId) return;
  
    // var docType = docTypeMap[docId];
  
    // if (docType) {
    //   setDocTypeList(docType);
    //   setSelectedDocType(docType[0]);
    // } else {
    //   setDocTypeList(["Paystub", "W2", "Bank Statement", "Credit Report", "WVOE"]);
    //   setSelectedDocType("Paystub");
    // }
    const SelectedName = docId.split("_")[0] || "";
    setDocTypeList([`${SelectedName}`]);
    setSelectedDocType(`${SelectedName}`);
  }, [docId]);
  
  

  async function handleJSONChange() {
    if (!docId) return;
    debugger
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/getJson?pdfFileName=${docId}.json`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to fetch JSON');
      }

      const data = await res.json();
      setJsonData(data);
    } catch (err) {
      console.error("❌ Error loading JSON:", err);
      setJsonData({});
    }
  }

  useEffect(function () {
    if (docId) {
      handleJSONChange();
    }
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
        docTypeList, // updated here
        feedbackDates: feedbackDates[selectedDocType] || [],
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
