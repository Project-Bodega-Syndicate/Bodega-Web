import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [allPrd, setAllPrd] = useState([]);
  const [singlePrd, setSinglePrd] = useState({});

  return (
    <AppContext.Provider value={{ singlePrd, setSinglePrd, allPrd, setAllPrd }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
