// src/config/pdfPathMap.js

export const pdfPathMap = {
  "Bank Statement": (docId) => `/${docId}/pdf/ic_${docId}_bankstatement.pdf`,
  Paystub: (docId) => `/${docId}/pdf/ic_${docId}_paystub.pdf`,
  W2: (docId) => `/${docId}/pdf/ic_${docId}_w2.pdf`,
  "Credit Report": (docId) => `/${docId}/pdf/ic_${docId}_creditreport.pdf`,
  WVOE: (docId) => `/${docId}/pdf/ic_${docId}_wvoe.pdf`,
  1040: (docId) => `/${docId}/pdf/ic_${docId}.pdf`,
  2544: (docId) => `/${docId}/pdf/ic_${docId}.pdf`,
  2675: (docId) => `/${docId}/pdf/ic_${docId}.pdf`,
  "Schedule E": (docId) => "",
  VVOE: (docId) => "",
};
