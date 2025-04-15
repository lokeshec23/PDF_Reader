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
};
