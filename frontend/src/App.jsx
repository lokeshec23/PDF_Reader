import Header from "./components/Header/Header";
import JViewer from "./components/Jviewer/JViewer";
import PViewer from "./components/PViewer/Pviewer";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Viewers Section */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 bg-gray-50">
        <div className="w-full md:w-1/2 border rounded-2xl shadow-md p-4 bg-white overflow-auto">
          <PViewer />
        </div>
        <div className="w-full md:w-1/2 border rounded-2xl shadow-md p-4 bg-white overflow-auto">
          <JViewer />
        </div>
      </div>
    </div>
  );
};

export default App;
