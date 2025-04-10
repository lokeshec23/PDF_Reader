import { Dropdown } from "@carbon/react";
import Header from "./components/Header/Header";
import JViewer from "./components/Jviewer/JViewer";
import PViewer from "./components/PViewer/Pviewer";

const App = () => {
  const items = [
    "Bank Statement",
    "Paystub",
    "W2",
    "Schedule E",
    "Credit report",
  ];
  return (
    <div className="flex flex-col h-screen">
      {/* Header - 10% height */}
      <div className="">
        <Header />
      </div>

      {/* Main Viewers Section - 90% height */}
      <div className=" flex flex-col md:flex-row gap-4 p-4 bg-gray-50 overflow-hidden" style={{padding: "10px 20px", marginTop: '3%'}}>
        <div className="w-full md:w-1/2">
          <div className="flex flex-row justify-between items-center mb-2 px-2" style={{padding: "8px"}}>
            <p>
              Loan ID: <b>0060826051</b>
            </p>
            <p>
              Borrower Name: <b>BOWEN F DIAMOND</b>
            </p>
          </div>

          <div className="border rounded-2xl shadow-md p-4 bg-white ">
            <PViewer />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          
            <Dropdown
              id="inline"
              titleText="Document Type"
              initialSelectedItem={items[0]}
              label={items[0]}
              type="inline"
              items={items}
            />
          <div className="border rounded-2xl shadow-md p-4 bg-white">
            <JViewer />
            {/* <PViewer /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
