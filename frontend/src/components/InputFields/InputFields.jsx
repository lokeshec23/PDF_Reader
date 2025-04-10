import { Dropdown } from "@carbon/react";
import { TextInput } from "carbon-components-react";
const items = [
  "Bank Statement",
  "Paystub",
  "W2",
  "Schedule E",
  "Credit report",
];
const InputFields = () => {
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
        initialSelectedItem={items[0]}
        label={items[0]}
        items={items}
        //   type="inline"
      />
      <TextInput
        id="text-input-1"
        type="text"
        labelText="Name of Institution"
      />
      <TextInput id="text-input-1" type="text" labelText="Account Holder" />
      <TextInput id="text-input-1" type="text" labelText="Account Number" />
      <TextInput id="text-input-1" type="text" labelText="Credit/Debit" />
      <TextInput id="text-input-1" type="text" labelText="Amount" />
    </div>
  );
};

export default InputFields;
