import { createContext, useState, useEffect } from "react";
import Hashids from "hashids";
const AppContext = createContext({});
const hashids = new Hashids("Project BDGA", 6);

export const AppProvider = ({ children }) => {
  // For Products
  const [allPrd, setAllPrd] = useState([]);
  const [singlePrd, setSinglePrd] = useState({});

  // For Shops
  const [allShops, setAllShops] = useState([]);
  const [singleShop, setSingleShop] = useState({});

  // For Profile.js
  const [userPrfData, setUserPrfData] = useState([]);
  const [userPrfData2, setUserPrfData2] = useState([]);
  const [userPrdList, setUserPrdList] = useState([]);
  const [userSinglePrd, setUserSinglePrd] = useState([]);
  const [activeGrid, setActiveGrid] = useState("none");

  // For Subdomain Config Profile2.js
  const [userData, setUserData] = useState([]);
  const [subdLoading, setSubdLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  // For HashIds
  const [hashList, setHashList] = useState([]);

  useEffect(() => {
    var tempList = [];
    for (var i = 0; i <= 300; i++) {
      tempList.push(hashids.encode(i));
    }
    setHashList(tempList);
  }, []);

  // useEffect(() => {
  //   if (hashList) {
  //     // console.log(hashList);
  //     // console.log(typeof hashList[5]);
  //   }
  // }, [hashList]);

  return (
    <AppContext.Provider
      value={{
        allPrd,
        setAllPrd,
        singlePrd,
        setSinglePrd,
        allShops,
        setAllShops,
        singleShop,
        setSingleShop,
        userPrfData,
        setUserPrfData,
        userPrfData2,
        setUserPrfData2,
        userPrdList,
        setUserPrdList,
        userSinglePrd,
        setUserSinglePrd,
        activeGrid,
        setActiveGrid,
        userData,
        setUserData,
        subdLoading,
        setSubdLoading,
        noUser,
        setNoUser,
        hashList,
        setHashList,
        hashids,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
