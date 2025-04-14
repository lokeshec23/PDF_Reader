// InputFields.jsx
import { Dropdown } from "@carbon/react";
import { Accordion, AccordionItem, TextInput } from "carbon-components-react";
import { useState } from "react";

const items = [
  "Bank Statement",
  "Paystub",
  "W2",
  "Schedule E",
  "Credit report",
];

const InputFields = ({ data, setHoveredKey }) => {
  const extractionData = data?.extraction_json || {};
  const transactions = extractionData?.transactions || [];

  const handleMouseEnter = (key, pageNum) => {
    if (key && pageNum != null) {
      setHoveredKey({ key, pageNum });
    }
  };

  const handleMouseLeave = () => {
    setHoveredKey({ key: null, pageNum: null });
  };

  return (
    <div
      style={{
        padding: "10px 20px",
        marginTop: "1%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        height: "85dvh",
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

      {[
        "Name of Institution",
        "Account Holder",
        "Account Number",
        "beginning date",
        "ending date",
      ].map((field) => (
        <div
          key={field}
          id={`json-${field}`}
          onMouseEnter={() => {
            if (
              data.extraction_json_with_coordinates?.[field]?.coordinates ==
              null
            ) {
              return;
            }
            handleMouseEnter(
              field,
              data.extraction_json_with_coordinates?.[field]?.page_num
            );
          }}
          onMouseLeave={handleMouseLeave}
        >
          <TextInput
            id={field.toLowerCase().replace(/\s+/g, "-")}
            type="text"
            labelText={field}
            value={extractionData[field] || ""}
          />
        </div>
      ))}

      <Accordion>
        {transactions.map((txn, index) => (
          <AccordionItem
            key={`txn-${index}`}
            title={txn.Description || `Transaction ${index + 1}`}
          >
            {["Credit_Debit", "Amount", "Account", "Description"].map(
              (field) => (
                <div
                  key={`${field}-${index}`}
                  id={`json-${field}-${index}`}
                  onMouseEnter={() => {
                    if (
                      data.extraction_json_with_coordinates?.transactions?.[
                        index
                      ]?.[field]["coordinates"] == null
                    ) {
                      return;
                    }
                    handleMouseEnter(
                      `${field}-${index}`,
                      data.extraction_json_with_coordinates?.transactions?.[
                        index
                      ]?.[field]?.page_num
                    );
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <TextInput
                    id={`${field.toLowerCase()}-${index}`}
                    type="text"
                    labelText={field.replace("_", " ")}
                    value={txn[field] || ""}
                  />
                </div>
              )
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default InputFields;
