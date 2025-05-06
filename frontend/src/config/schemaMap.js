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
    sectionFields: ["Credit_Debit", "creditor","Amount", "Account", "Description"],
    sectionTitleField: "Description",
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
    sectionTitleField: "TypeName",
  },
  W2: {
    flatFields: ["Employer Name"],
    sectionKey: "W2",
    sectionTitle: "W2 Detail",
    sectionFields: ["year", "wages"],
    sectionTitleField: "year",
  },
  "Credit Report": {
    flatFields: ["Vendor Name"],
    sectionKey: "libilities",
    sectionTitle: "Liabilities",
    sectionFields: [
      "creditor_name",
      "account_number",
      "liability_type",
      "mon payment",
    ],
    sectionTitleField: "creditor_name",
  },
  WVOE: {
    flatFields: ["Rate Of Pay", "Pay Frequency", "Hours"],
    sectionKey: "years",
    sectionTitle: "Years",
    sectionFields: [
      "Year",
      "Base Salary",
      "Overtime",
      "Commissions",
      "Bonus",
      "Others",
      "Total",
    ],
    sectionTitleField: "Year",
  },
  1040: {
    flatFields: ["First Name", "Last Name", "SSN", "year", "Schedule C Profit or Loss"],

    // sectionKey: "W2",

    // sectionTitle: "W2 Detail",

    // sectionFields: ["year", "wages"],

    // sectionTitleField: "year", // NEW!
  },
 "1040-F": {
    // flatFields: ["First Name", "Last Name", "SSN", "year", "Schedule C Profit or Loss"],

    sectionKey: "Year",

    sectionTitle: "Tax Year",

    sectionFields: ["Start_date", "End_date", "F_Net_Profit_or_loss", "F_Non_Recurring_Income_or_Loss", "F_Depreciation", "F_Amortization", "F_CasualtyLoss", "F_Depletion", "F_Business_Use_of_Home"],

    sectionTitleField: "Tax Year", // NEW!
  },
 "1040-C_2023-2024": {
   // flatFields: ["First Name", "Last Name", "SSN", "year", "Schedule C Profit or Loss"],

   sectionKey: "Year",

   sectionTitle: "Tax Year",

   sectionFields: ["Start_date", "End_date", "W_2_Income", "B_Interest_Income","B_Dividend_Income","C_ Net_ Profit_or_loss", "C_Other_Non_Recurring_Income_or_Loss", "C_Depletion", "C_Depreciation", "C_Meals_AND_Entertainment", "C_Business_Use_of_Home"],

   sectionTitleField: "Tax Year", // NEW!
  },
};
