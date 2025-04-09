import ICLOGO from "../../assets/images/IC_Logo.jpg";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white px-6 py-3 shadow-md z-10">
      {/* Logo and App Title */}
      <div className="flex items-center gap-4">
        <img src={ICLOGO} alt="IC-LOGO" className="h-15 w-50" />
      </div>

      {/* Header Menu */}
      <div className="flex items-center gap-6 text-sm text-gray-700">
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-700">
          <span className="text-base">❓</span>
          <span>FAQ</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-700">
          <span className="text-base">✉️</span>
          <span>Contact</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-700">
          <span className="text-base">🌙</span>
          <span>Light / Dark</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-500 text-white flex items-center justify-center font-semibold">
          LS
        </div>
      </div>
    </header>
  );
};

export default Header;
