// InputFields.jsx
import { Dropdown } from "@carbon/react";
import { Accordion, AccordionItem, TextInput } from "carbon-components-react";

const items = [
  "Bank Statement",
  "Paystub",
  "W2",
  "Schedule E",
  "Credit report",
];

const InputFields = ({ data }) => {
  const extractionData = data?.extraction_json || {};
  const transactions = extractionData?.transactions || [];

  return (
    <div
      style={{
        padding: "10px 20px",
        marginTop: "1%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxHeight: "80vh",
        overflowY: "auto",
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
        id="beginning-date"
        type="text"
        labelText="Beginning Date"
        value={extractionData["beginning date"] || ""}
      />

      <TextInput
        id="ending-date"
        type="text"
        labelText="Ending Date"
        value={extractionData["ending date"] || ""}
      />

      <Accordion>
        {transactions.map((txn, index) => (
          <AccordionItem
            key={`txn-${index}`}
            title={txn.Description || `Transaction ${index + 1}`}
          >
            <TextInput
              id={`credit-debit-${index}`}
              type="text"
              labelText="Credit/Debit"
              value={txn.Credit_Debit || ""}
            />
            <TextInput
              id={`amount-${index}`}
              type="text"
              labelText="Amount"
              value={txn.Amount || ""}
            />
            <TextInput
              id={`account-${index}`}
              type="text"
              labelText="Account"
              value={txn.Account || ""}
            />
            <TextInput
              id={`description-${index}`}
              type="text"
              labelText="Description"
              value={txn.Description || ""}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default InputFields;
