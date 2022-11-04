import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [allPrd, setAllPrd] = useState([]);
  const [singlePrd, setSinglePrd] = useState({});

  // For Profile.js
  const [userPrfData, setUserPrfData] = useState([]);
  const [userPrfData2, setUserPrfData2] = useState([]);

  // For Subdomain Config Profile2.js
  const [userData, setUserData] = useState([]);
  const [subdLoading, setSubdLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  return (
    <AppContext.Provider
      value={{
        singlePrd,
        setSinglePrd,
        allPrd,
        setAllPrd,
        userData,
        setUserData,
        subdLoading,
        setSubdLoading,
        noUser,
        setNoUser,
        userPrfData,
        setUserPrfData,
        userPrfData2,
        setUserPrfData2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
