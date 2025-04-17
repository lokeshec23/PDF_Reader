// src/config/pdfPathMap.js

export const pdfPathMap = {
  "Bank Statement": (docId) => `/${docId}/pdf/ic_${docId}_bankstatement.pdf`,
  Paystub: (docId) => `/${docId}/pdf/ic_${docId}_paystub.pdf`,
  W2: (docId) => `/${docId}/pdf/ic_${docId}_w2.pdf`,
  "Credit Report": (docId) => `/${docId}/pdf/ic_${docId}_creditreport.pdf`,
  WVOE: (docId) => `/${docId}/pdf/ic_${docId}_wvoe.pdf`,
  "Schedule E": (docId) => "",
  VVOE: (docId) => "",
};
