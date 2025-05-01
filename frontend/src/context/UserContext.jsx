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
  
  

   const  handleJSONChange = async () => {
    if (!docId) return;
  
    const MAX_ATTEMPTS = 10;
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/getJson?pdfFileName=${docId}.json`);
  
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Failed to fetch JSON');
        }
  
        const data = await res.json();
  
        const isEmptyJson = Object.keys(data || {}).length === 0;
  
        if (!isEmptyJson) {
          console.log("JS", data)
          setJsonData(data); // ✅ Success
          return;
        }
  
        console.warn(`⚠️ Attempt ${attempt}: Empty JSON received. Retrying...`);
  
        // Delay before the next attempt
        const waitTime = attempt === MAX_ATTEMPTS ? 2000 : 4000; // 2s after last, else 4s
        await delay(waitTime);
      } catch (err) {
        console.error(`❌ Error on attempt ${attempt}:`, err.message);
  
        if (attempt === MAX_ATTEMPTS) {
          setJsonData({});
        } else {
          const waitTime = attempt === MAX_ATTEMPTS ? 2000 : 4000;
          await delay(waitTime);
        }
      }
    }
  
    // If all attempts fail (including empty JSONs), fallback
    console.error('🛑 All attempts exhausted. Setting empty object.');
    setJsonData({});
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
