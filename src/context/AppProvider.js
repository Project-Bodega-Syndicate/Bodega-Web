import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Hashids from "hashids";
const AppContext = createContext({});
const hashids = new Hashids("Project BDGA", 6);
const productURL = process.env.REACT_APP_PRODUCT_URL;

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

  // useEffect(() => {
  //   var tempList = [];
  //   for (var i = 0; i <= 300; i++) {
  //     tempList.push(hashids.encode(i));
  //   }
  //   setHashList(tempList);
  // }, []);

  useEffect(() => {
    const fetchProducts = () => {
      const fetchProducts = async () => {
        try {
          var tempList = [];
          var tempList2 = [];
          const headers = {
            "Content-Type": "application/json",
          };
          const response = await axios.post(productURL, {
            headers: headers,
          });
          if (response) {
            // console.log("Product API Response: ", response.data);
            setAllPrd(response.data);

            if (response.data && response.data.length !== 0) {
              response.data.forEach((x) => {
                tempList2.push(x.id);
              });
              tempList2 = tempList2.sort(function (a, b) {
                return a - b;
              });
              var arrLen = tempList2.slice(-1)[0] + 50;
              for (var i = 0; i <= arrLen; i++) {
                tempList.push(hashids.encode(i));
              }
              setHashList(tempList);
            } else {
              for (var j = 0; j <= 600; j++) {
                tempList.push(hashids.encode(i));
              }
              setHashList(tempList);
            }

            // setIsLoading(false);
            // if (response.data.length === 0) {
            //   setIsLoading(false);
            // } else {
            //   setData(response.data[0]);
            // }
          }
        } catch (err) {
          console.log(err.response);
        }
      };
      // setIsLoading(true);
      fetchProducts();
    };
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   if (hashList) {
  //     console.log(hashList);
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
