import { Dropdown } from "@carbon/react";
import { TextInput } from "carbon-components-react";

const items = [
  "Bank Statement",
  "Paystub",
  "W2",
  "Schedule E",
  "Credit report",
];

const InputFields = ({ data }) => {
  // Extract values from the JSON data
  const extractionData = data?.extraction_json || {};

  return (
    <div
      style={{
        padding: "10px 20px",
        marginTop: "1%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Dropdown
        id="inline"
        titleText="Document Type"
        initialSelectedItem={extractionData.doc_type || items[0]}
        label={extractionData.doc_type || items[0]}
        items={items}
      />
      <TextInput
        id="name-of-institution"
        type="text"
        labelText="Name of Institution"
        value={extractionData["Name of Institution"] || ""}
      />
      <TextInput
        id="account-holder"
        type="text"
        labelText="Account Holder"
        value={extractionData["Account Holder"] || ""}
      />
      <TextInput
        id="account-number"
        type="text"
        labelText="Account Number"
        value={extractionData["Account Number"] || ""}
      />
      <TextInput
        id="credit-debit"
        type="text"
        labelText="Credit/Debit"
        value={extractionData["Credit_Debit"] || ""}
      />
      <TextInput
        id="amount"
        type="text"
        labelText="Amount"
        value={extractionData["Amount"] || ""}
      />
    </div>
  );
};

export default InputFields;
