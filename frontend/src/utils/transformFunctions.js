const paystubTransform = (labels) => {
  try {
    if (!Array.isArray(labels))
      throw new Error("Invalid input: 'labels' must be an array.");

    // Utility to get label values
    const getLabelValue = (labelName) =>
      labels.find((label) => label.LabelName === labelName)?.Values?.[0]
        ?.Value || "";

    const getLabelValues = (labelName) =>
      labels
        .find((label) => label.LabelName === labelName)
        ?.Values?.map((v) => v.Value) || [];

    // Extract base fields
    const payPeriodStart = getLabelValue("Pay Period Start Date");
    const payPeriodEnd = getLabelValue("Pay Period End Date");
    const actualPayFrequency = getLabelValue("Actual Pay Frequency");
    const employerName = getLabelValue("Employer Name");

    // Bonus: Add more field mappings here if needed (like "Base Current Pay Monthly")

    // Extract Earnings Description and YTD Earnings
    const earningDescriptions = getLabelValues("Earning Description");
    const ytdEarnings = getLabelValues("Year to Date Earnings");

    const earningsSummary = earningDescriptions.map((desc, i) => ({
      IncomeName: "Fixed Income",
      TypeName: desc,
      IncomeType: "Wage",
      Rate: "0.00",
      Hours: "0.00",
      ThisPeriod: "",
      BonusPayFreuency: "Select",
      YTDEarnings: ytdEarnings[i] || "",
      Exclude: "0",
      ReasonForExclude: "",
    }));

    // Final structured output with extended fields
    return {
      doc_type: "paystub",
      extraction_json: {
        "Employer name": employerName || "",
        PayPeriodStartDate: payPeriodStart || "",
        PayPeriodEndDate: payPeriodEnd || "",
        "Pay Frequency": actualPayFrequency || "",
        "Base Current Pay Monthly": "", // Placeholder, customize if needed
        paystubdetails: [
          // Keep the detailed fields too
          //   Employer_Name: { value: employerName },
          //   Pay_Period_Start_Date: { value: payPeriodStart },
          //   Pay_Period_End_Date: { value: payPeriodEnd },
          //   Actual_Pay_Frequency: { value: actualPayFrequency },
          earningsSummary,
        ],
      },
    };
  } catch (error) {
    console.error("Error in transformLabels:", error.message);
    return {
      doc_type: "paystub",
      "Employer name": "",
      PayPeriodStartDate: "",
      PayPeriodEndDate: "",
      "Pay Frequency": "",
      "Base Current Pay Monthly": "",
      Employer_Name: { value: "" },
      Pay_Period_Start_Date: { value: "" },
      Pay_Period_End_Date: { value: "" },
      Actual_Pay_Frequency: { value: "" },
      Earnings_Summary: [],
    };
  }
};

export { paystubTransform };
