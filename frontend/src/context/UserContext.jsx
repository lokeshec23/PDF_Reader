import { createContext, useState } from "react";

// 1. Create the context
export const UserContext = createContext();

// 2. Create the provider component
export const UserProvider = ({ children }) => {
  const [themeStyle, setThemeStyle] = useState({ primary: "#4589ff" }); // Default theme is light

  return (
    <UserContext.Provider value={{ themeStyle }}>
      {children}
    </UserContext.Provider>
  );
};
