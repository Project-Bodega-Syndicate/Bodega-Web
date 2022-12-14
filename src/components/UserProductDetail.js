import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import Modal2 from "./Modal2.js";

const UserProductDetails = () => {
  const { id, pid } = useParams();
  const navigate = useNavigate();
  const {
    noUser,
    setNoUser,
    userPrfData,
    setUserPrfData,
    userPrdList,
    setUserPrdList,
    userSinglePrd,
    setUserSinglePrd,
    hashList,
    hashids,
  } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  // const [prdOwner, setPrdOwner] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noPrdErr, setNoPrdErr] = useState(false);
  const [decodedId, setDecodedId] = useState([]);

  const u_name = id;
  // const prdURL = process.env.REACT_APP_PRODUCT_DETAIL_URL;
  // const baseURL4 = process.env.REACT_APP_BASEURL4;
  const baseURL2 = process.env.REACT_APP_BASEURL2;
  const userPrdURL = process.env.REACT_APP_USER_PRODUCT_URL;

  useEffect(() => {
    if (hashList) {
      // console.log(hashList);
      setNoPrdErr(true);
      hashList.forEach((x) => {
        if (pid === x) {
          setNoPrdErr(false);
          // console.log("Present: ", hashids.decode(pid));
          // console.log(typeof hashids.decode(pid)[0]);
          setDecodedId(hashids.decode(pid));
        }
      });
    }
  }, [hashList, hashids, pid]);

  // useEffect(() => {
  //   console.log("Single Product Data: ", singlePrd);
  // }, [singlePrd]);

  // useEffect(() => {
  //   if (userPrfData && userPrfData.id) {
  //     console.log(userPrfData);
  //   }
  // }, [userPrfData]);

  // useEffect(() => {
  //   if (userSinglePrd && userSinglePrd.id) {
  //     console.log(userSinglePrd);
  //   }
  // }, [userSinglePrd]);

  useEffect(() => {
    if (userPrfData && userPrfData.id) {
      return;
    } else if (!userPrfData || !userPrfData.id) {
      if (id) {
        const fetchData = (u_name) => {
          const fetchData = async (u_name) => {
            try {
              const headers = {
                "Content-Type": "application/json",
              };
              const response = await axios.post(baseURL2, {
                headers: headers,
                metausername: u_name,
              });
              if (response) {
                // console.log("API Response: ", response.userPrfData);
                if (response.data.length === 0) {
                  setIsLoading(false);
                  setNoUser(true);
                } else {
                  setUserPrfData(response.data[0]);
                }
              }
            } catch (err) {
              console.log(err.response.data);
            }
          };
          setIsLoading(true);
          fetchData(u_name);
        };
        fetchData(u_name);
      } else {
        // setIsLoading(true);
      }
    }
  }, [u_name, baseURL2, id, setNoUser, setUserPrfData, userPrfData]);

  useEffect(() => {
    if (userPrdList && userPrdList.length !== 0) {
      return;
    } else if (!userPrdList || userPrdList.length === 0) {
      if (userPrfData && userPrfData.id && !noUser) {
        const fetchUserPrd = (u_id) => {
          const fetchUserPrd = async (u_id) => {
            try {
              const headers = {
                "Content-Type": "application/json",
              };
              const response = await axios.post(userPrdURL, {
                headers: headers,
                metauserID: u_id,
              });
              if (response) {
                setIsLoading(false);
                // console.log("User Prd Response: ", response.data);
                setUserPrdList(response.data);
              }
            } catch (err) {
              console.log(err.response.data);
            }
          };
          setIsLoading(true);
          fetchUserPrd(u_id);
        };
        fetchUserPrd(userPrfData.ownerMetaUserID);
      }
    }

    // if (userPrfData && userPrfData.id && !noUser) {
    //   fetchUserPrd(userPrfData.ownerMetaUserID);
    // }
  }, [userPrfData, userPrdURL, noUser, userPrdList, setUserPrdList]);

  useEffect(() => {
    if (userSinglePrd && userSinglePrd.product_image1) {
      return;
    } else if (!userSinglePrd || !userSinglePrd.product_image1) {
      if (pid && decodedId[0] && userPrdList) {
        setNoPrdErr(true);
        userPrdList.forEach((x) => {
          if (decodedId[0] === x.id) {
            setUserSinglePrd(x);
            setNoPrdErr(false);
          }
        });
      } else {
        // setIsLoading(true);
        // setNoPrdErr(true);
      }
    }
  }, [pid, decodedId, userSinglePrd, setUserSinglePrd, userPrdList]);

  const handleVisitCreator = () => {
    if (userPrfData && userPrfData.id) {
      navigate(`/${userPrfData.metausername}`);
    }
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center h-screen w-full">
      <Modal2 showModal={showModal} setShowModal={setShowModal} />

      <div className="flex flex-col justify-start items-center h-screen w-full px-4 pt-12 text-white">
        {isLoading ? (
          <div className="loadingCont flex justify-center items-center h-screen w-full">
            <svg
              width="214"
              height="214"
              viewBox="0 0 214 214"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin h-24 w-24"
            >
              <path
                opacity="0.083334"
                d="M113.972 49.7836C113.972 44.9326 110.947 41 107.215 41C103.483 41 100.458 44.9326 100.458 49.7836V67.3509C100.458 72.2019 103.483 76.1345 107.215 76.1345C110.947 76.1345 113.972 72.2019 113.972 67.3509V49.7836Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.166667"
                d="M141.782 60.8563C144.208 56.6551 143.554 51.7369 140.322 49.8711C137.091 48.0053 132.505 49.8985 130.079 54.0996L121.296 69.3133C118.87 73.5144 119.524 78.4327 122.755 80.2985C125.987 82.1642 130.573 80.2711 132.998 76.0699L141.782 60.8563Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.25"
                d="M160.33 84.3507C164.531 81.9252 166.425 77.3392 164.559 74.1075C162.693 70.8759 157.775 70.2224 153.574 72.6479L138.36 81.4315C134.159 83.8571 132.266 88.4431 134.132 91.6748C135.997 94.9064 140.916 95.5599 145.117 93.1344L160.33 84.3507Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.333334"
                d="M164.646 113.972C169.497 113.972 173.43 110.947 173.43 107.215C173.43 103.483 169.497 100.458 164.646 100.458H147.079C142.228 100.458 138.296 103.483 138.296 107.215C138.296 110.947 142.228 113.972 147.079 113.972H164.646Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.416667"
                d="M153.574 141.782C157.775 144.208 162.693 143.554 164.559 140.322C166.425 137.091 164.531 132.505 160.33 130.079L145.117 121.296C140.915 118.87 135.997 119.524 134.131 122.755C132.266 125.987 134.159 130.573 138.36 132.998L153.574 141.782Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.5"
                d="M130.079 160.33C132.505 164.531 137.091 166.425 140.323 164.559C143.554 162.693 144.208 157.775 141.782 153.574L132.999 138.36C130.573 134.159 125.987 132.266 122.755 134.131C119.524 135.997 118.87 140.915 121.296 145.117L130.079 160.33Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.583334"
                d="M100.458 164.646C100.458 169.497 103.483 173.43 107.215 173.43C110.947 173.43 113.972 169.497 113.972 164.646V147.079C113.972 142.228 110.947 138.295 107.215 138.295C103.483 138.295 100.458 142.228 100.458 147.079V164.646Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.666667"
                d="M72.648 153.574C70.2224 157.775 70.8759 162.693 74.1076 164.559C77.3392 166.424 81.9253 164.531 84.3508 160.33L93.1344 145.117C95.5599 140.915 94.9065 135.997 91.6748 134.131C88.4432 132.266 83.8571 134.159 81.4316 138.36L72.648 153.574Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.75"
                d="M54.0997 130.079C49.8986 132.505 48.0054 137.091 49.8712 140.322C51.737 143.554 56.6552 144.208 60.8563 141.782L76.07 132.998C80.2712 130.573 82.1643 125.987 80.2985 122.755C78.4328 119.524 73.5145 118.87 69.3134 121.296L54.0997 130.079Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.833334"
                d="M49.7836 100.458C44.9326 100.458 41 103.483 41 107.215C41 110.947 44.9326 113.972 49.7836 113.972H67.3509C72.2019 113.972 76.1345 110.947 76.1345 107.215C76.1345 103.483 72.2019 100.458 67.3509 100.458H49.7836Z"
                fill="#8F8C8D"
              />
              <path
                opacity="0.916667"
                d="M60.8564 72.6478C56.6552 70.2223 51.737 70.8758 49.8712 74.1075C48.0054 77.3391 49.8986 81.9251 54.0998 84.3507L69.3134 93.1343C73.5146 95.5598 78.4328 94.9063 80.2986 91.6747C82.1644 88.443 80.2712 83.857 76.0701 81.4315L60.8564 72.6478Z"
                fill="#8F8C8D"
              />
              <path
                d="M84.3507 54.0996C81.9252 49.8985 77.3392 48.0053 74.1075 49.8711C70.8759 51.7369 70.2224 56.6551 72.6479 60.8563L81.4315 76.0699C83.8571 80.2711 88.4431 82.1642 91.6748 80.2985C94.9064 78.4327 95.5599 73.5144 93.1344 69.3133L84.3507 54.0996Z"
                fill="#8F8C8D"
              />
            </svg>
          </div>
        ) : noPrdErr ? (
          <div className="flex justify-center items-center h-full w-full text-white">
            <p className="mt-10">Invalid Product URL</p>
          </div>
        ) : noUser ? (
          <div className="flex justify-center items-center h-full w-full text-white">
            <p className="mt-10">No public link exists for this user</p>
          </div>
        ) : (
          userSinglePrd &&
          !isLoading &&
          !noPrdErr &&
          !noUser && (
            <>
              <div className="w-full">
                <img
                  className="w-full"
                  alt=""
                  src={userSinglePrd.product_image1}
                ></img>
              </div>
              <div className="flex flex-row justify-between w-full mt-10 px-2">
                <div className="w-6/12">
                  <p>{userSinglePrd.productName}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>${userSinglePrd.sellingPrice}</p>
                </div>
              </div>
              <div className="mt-16 px-6">
                <p>{userSinglePrd.producDescription}</p>
              </div>
              <button
                className="p-2 mt-10 h-10 bg-sky-600 rounded-lg text-center"
                onClick={() => handleVisitCreator()}
              >
                Visit Creator's Profile
              </button>
              <div className="flex flex-row justify-between w-4/5 mt-6 pb-12">
                <button
                  className="p-2 h-10 mr-1 bg-neutral-800 rounded-lg text-center border-solid border-2 border-white w-36"
                  onClick={openModal}
                >
                  Yerrr
                </button>
                <button
                  className="p-2 h-10 ml-1 bg-neutral-800 rounded-lg text-center border-solid border-2 border-white w-36"
                  onClick={openModal}
                >
                  Buy
                </button>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default UserProductDetails;
