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
        "PayPeriodStartDate": payPeriodStart || "",
        "PayPeriodEndDate": payPeriodEnd || "",
        "Pay Frequency": actualPayFrequency || "",
        "Base Current Pay Monthly": "", // Placeholder, customize if needed
        "paystubdetails": earningsSummary,
       
      },
      // "extraction_json_with_coordinates": {
      //   doc_type: {
      //     value: "paystub",
      //     coordinates: null,
      //     page_num: null,
      //   },
      //   "Employer name": {
      //     value: "The Bernstein COmpanies",
      //     coordinates: {
      //       x0: 0.2898039215686274,
      //       y0: 0.0273123611111113,
      //       x1: 0.9318951665688889,
      //       y1: 0.7948892242424244,
      //     },
      //     page_num: 1,
      //   },
      //   PayPeriodStartDate: {
      //     value: "05/01/2024",
      //     coordinates: {
      //       x0: 0.688823529411764705,
      //       y0: 0.3674935676767677,
      //       x1: 0.30711979077443796,
      //       y1: 0.17958357323232318,
      //     },
      //     page_num: 1,
      //   },
      //   PayPeriodEndDate: {
      //     value: "10/18/2024",
      //     coordinates: {
      //       x0: 0.688823529411764705,
      //       y0: 0.3674935676767677,
      //       x1: 0.7700845280530065,
      //       y1: 0.6001922545454547,
      //     },
      //     page_num: 1,
      //   },
      //   "Pay Frequency": {
      //     value: "Weekly",
      //     coordinates: null,
      //     page_num: 1,
      //   },
      //   "Base Current Pay Monthly": {
      //     value: "99710.00",
      //     coordinates: {
      //       x0: 0.058823529411764705,
      //       y0: 0.7104941792929294,
      //       x1: 0.49299592811939874,
      //       y1: 0.8515269010101009,
      //     },
      //     page_num: 1,
      //   },
      //   paystubdetails: [
      //     {
      //       IncomeName: {
      //         value: "Fixed Income",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       TypeName: {
      //         value: "Bonus",
      //         coordinates: {
      //           x0: 0.468823529411764705,
      //           y0: 0.44004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       IncomeType: {
      //         value: "Wage",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       Rate: {
      //         value: "10",
      //         coordinates: {
      //           x0: 0.468823529411764705,
      //           y0: 0.44004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Hours: {
      //         value: "10",
      //         coordinates: {
      //           x0: 0.468823529411764705,
      //           y0: 0.44004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ThisPeriod: {
      //         value: "2000.00",
      //         coordinates: {
      //           x0: 0.468823529411764705,
      //           y0: 0.44004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       BonusPayFreuency: {
      //         value: "Select",
      //         coordinates: {
      //           x0: 0.468823529411764705,
      //           y0: 0.44004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       YTDEarnings: {
      //         value: "100",
      //         coordinates: {
      //           x0: 0.468823529411764705,
      //           y0: 0.44004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Exclude: {
      //         value: "0",
      //         coordinates: {
      //           x0: 0.468823529411764705,
      //           y0: 0.44004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ReasonForExclude: {
      //         value: "",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //     },
      //     {
      //       IncomeName: {
      //         value: "Fixed Income",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       TypeName: {
      //         value: "Base/RegularPay",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       IncomeType: {
      //         value: "Wage",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       Rate: {
      //         value: "33.36",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Hours: {
      //         value: "48.00",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ThisPeriod: {
      //         value: "1,619.12",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       BonusPayFreuency: {
      //         value: "Select",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       YTDEarnings: {
      //         value: "100",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Exclude: {
      //         value: "0",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ReasonForExclude: {
      //         value: "",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.450004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //     },
      //     {
      //       IncomeName: {
      //         value: "Fixed Income",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       TypeName: {
      //         value: "Base/RegularPay",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.460004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       IncomeType: {
      //         value: "Wage",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       Rate: {
      //         value: "33.36",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.460004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Hours: {
      //         value: "48.00",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.460004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ThisPeriod: {
      //         value: "1,619.12",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.460004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       BonusPayFreuency: {
      //         value: "Select",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.460004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       YTDEarnings: {
      //         value: "100",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.460004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Exclude: {
      //         value: "0",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.460004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ReasonForExclude: {
      //         value: "",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.460004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //     },
      //     {
      //       IncomeName: {
      //         value: "Fixed Income",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       TypeName: {
      //         value: "Base/RegularPay",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.470004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       IncomeType: {
      //         value: "Wage",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       Rate: {
      //         value: "33.36",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.470004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Hours: {
      //         value: "48.00",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.470004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ThisPeriod: {
      //         value: "1,619.12",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.470004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       BonusPayFreuency: {
      //         value: "Select",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.470004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       YTDEarnings: {
      //         value: "100",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.470004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Exclude: {
      //         value: "0",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.470004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ReasonForExclude: {
      //         value: "",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.470004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //     },
      //     {
      //       IncomeName: {
      //         value: "Fixed Income",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       TypeName: {
      //         value: "Base/RegularPay",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.480004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       IncomeType: {
      //         value: "Wage",
      //         coordinates: null,
      //         page_num: 1,
      //       },
      //       Rate: {
      //         value: "33.36",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.480004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Hours: {
      //         value: "48.00",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.480004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ThisPeriod: {
      //         value: "1,619.12",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.480004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       BonusPayFreuency: {
      //         value: "Select",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.480004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       YTDEarnings: {
      //         value: "100",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.480004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       Exclude: {
      //         value: "0",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.480004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //       ReasonForExclude: {
      //         value: "",
      //         coordinates: {
      //           x0: 0.458823529411764705,
      //           y0: 0.480004941792929294,
      //           x1: 0.49299592811939874,
      //           y1: 0.8515269010101009,
      //         },
      //         page_num: 1,
      //       },
      //     },
      //   ],
      // },
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
