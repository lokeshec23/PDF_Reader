export const schemaMap = {
  "Bank Statement": {
    flatFields: [
      "Name of Institution",
      "Account Holder",
      "Account Number",
      "beginning date",
      "ending date",
    ],
    sectionKey: "transactions",
    sectionTitle: "Transaction",
    sectionFields: ["Credit_Debit", "Amount", "Account", "Description"],
  },
  Paystub: {
    flatFields: [
      "Employer name",
      "PayPeriodStartDate",
      "PayPeriodEndDate",
      "Pay Frequency",
    ],
    sectionKey: "paystubdetails",
    sectionTitle: "Income",
    sectionFields: [
      "IncomeName",
      "TypeName",
      "IncomeType",
      "Rate",
      "Hours",
      "ThisPeriod",
      "YTDEarnings",
    ],
  },
  W2: {
    flatFields: ["Employer Name"],
    sectionKey: "W2",
    sectionTitle: "W2 Detail",
    sectionFields: ["year", "wages"],
  },
  "Credit Report": {
    flatFields: ["Vendor Name"],
    sectionKey: "libilities",
    sectionTitle: "Libilities",
    sectionFields: [
      "creditor_name",
      "account_number",
      "liability_type",
      "mon payment",
    ],
  },
};
