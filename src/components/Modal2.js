import React, {
  useRef,
  useEffect,
  // useCallback,
  useState,
} from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import useAuth from "../hooks/useAuth";
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

const Modal2 = ({ showModal, setShowModal }) => {
  // const { singlePrd } = useAppContext();
  const { auth, setAuth } = useAuth();
  const modalRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const userUnameRef = useRef();
  const errRef = useRef();

  const [formMode, setFormMode] = useState("initial");
  const [fullName, setFullName] = useState("");
  const [pwd, setPwd] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cvc, setCvc] = useState("");
  const [userUname, setUserUname] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [existLoginSuccess, setExistLoginSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [userUname, pwd2]);

  useEffect(() => {
    setShowModal(false);
    setFormMode("initial");
  }, [setShowModal]);

  useEffect(() => {
    if (formMode && formMode === "new") {
      if (nameRef && nameRef.current) {
        nameRef.current.focus();
      }
    } else if (formMode && formMode === "new2") {
      if (emailRef && emailRef.current) {
        emailRef.current.focus();
      }
    } else if (formMode && formMode === "existing") {
      if (userUnameRef && userUnameRef.current) {
        userUnameRef.current.focus();
      }
    }
  }, [formMode, nameRef, emailRef, userUnameRef]);

  // const closeModal = (e) => {
  //   if (modalRef.current === e.target) {
  //     setShowModal(false);
  //     setFormMode("initial");
  //   }
  // };

  // const keyPress = useCallback(
  //   (e) => {
  //     if (e.key === "Escape" && showModal) {
  //       setShowModal(false);
  //       setFormMode("initial");
  //       // console.log("I pressed");
  //     }
  //   },
  //   [setShowModal, showModal]
  // );

  // useEffect(() => {
  //   document.addEventListener("keydown", keyPress);
  //   return () => document.removeEventListener("keydown", keyPress);
  // }, [keyPress]);

  const handleCloseModal = () => {
    setShowModal((prev) => !prev);
    setFormMode("initial");
  };

  // const handleNewSubmit = () => {};

  // useEffect(() => {
  //   if (singlePrd && singlePrd.product_image1) {
  //     console.log(singlePrd);
  //   }
  // }, [singlePrd]);

  const handleBackBtn = () => {
    if (formMode && formMode === "initial") {
      return;
    } else if (formMode && formMode === "new") {
      setFormMode("initial");
    } else if (formMode && formMode === "new2") {
      setFormMode("new");
    } else if (formMode && formMode === "existing") {
      setFormMode("initial");
    } else if (formMode && formMode === "existing2") {
      setFormMode("initial");
    }
  };

  const handleExistLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(LOGIN_URL + userUname + "/", {
        headers: headers,
        // meta_username: user,
        passcode: pwd2,
        // public_hashkey: userKey,
      });
      console.log(response?.data);
      setIsLoading(false);
      if (
        response.data &&
        response.data.meta_username &&
        response.data.passcode &&
        response.data.public_hashkey
      ) {
        // setUser(response.data.meta_username);
        // setPwd(response.data.passcode);
        // setUserKey(response.data.public_hashkey);

        setAuth({
          id: response.data.id,
          meta_username: response.data.meta_username,
          public_hashkey: response.data.public_hashkey,
        });
        setExistLoginSuccess(true);
        setFormMode("existing2");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleExistingBtnClick = () => {
    if (auth && auth.id && auth.meta_username && auth.public_hashkey) {
      setExistLoginSuccess(true);
      setFormMode("existing2");
    } else {
      setFormMode("existing");
    }
  };

  const handleExistingLogout = async () => {
    localStorage.removeItem("id");
    localStorage.removeItem("meta_username");
    localStorage.removeItem("public_hashkey");
    setAuth({});
    setExistLoginSuccess(false);
    setFormMode("existing");
  };

  return (
    <>
      {showModal ? (
        <div
          // onClick={closeModal}
          ref={modalRef}
          className="flex flex-col justify-center items-center w-full h-full fixed bg-black/75"
        >
          <div className="flex flex-col justify-start items-center w-80 h-96 bg-neutral-800 rounded-lg">
            <div className="flex flex-row min-w-full justify-end items-center">
              <XMarkIcon
                className="w-8 text-white cursor-pointer align-right mr-1 mt-1"
                aria-label="Close modal"
                onClick={() => handleCloseModal()}
              />
            </div>
            {formMode && formMode !== "initial" && (
              <div className="flex flex-row min-w-full justify-start items-center px-4">
                <div className="flex flex-col justify-start items-start text-center text-white border-2 border-white rounded-xl">
                  <p
                    className="cursor-pointer text-center mr-2"
                    onClick={() => handleBackBtn()}
                  >
                    <ChevronLeftIcon className="text-white h-5 w-5 mb-1 inline-block" />
                    Back
                  </p>
                </div>
              </div>
            )}
            {errMsg && (
              <div className="flex flex-row min-w-full justify-center items-center">
                <p
                  ref={errRef}
                  className={
                    errMsg
                      ? "bg-rose-300 text-red-700 font-bold p-2 mb-2 mt-8 rounded-lg"
                      : "absolute hidden"
                  }
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
              </div>
            )}
            {isLoading && !existLoginSuccess && (
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
            )}
            {
              !isLoading && formMode && formMode === "initial" ? (
                <div className="flex flex-col justify-center items-center h-full px-2">
                  <button
                    className="p-2 w-full h-12 bg-neutral-700 rounded-md text-white"
                    onClick={() => handleExistingBtnClick()}
                  >
                    Existing User?
                  </button>
                  <button
                    className="p-2 mt-7 w-full h-12 bg-neutral-700 rounded-md text-white"
                    onClick={() => setFormMode("new")}
                  >
                    New User?
                  </button>
                </div>
              ) : !isLoading && formMode && formMode === "new" ? (
                <div className="flex flex-col justify-center items-center h-full w-full px-4">
                  <form className="flex flex-col w-full">
                    <input
                      ref={nameRef}
                      type="text"
                      id="username"
                      autoComplete="off"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                      // required
                      className="p-2 mt-3 text-sm w-full h-12 rounded-md text-black"
                      placeholder="Full Name"
                    />
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      // required
                      className="p-2 mt-3 text-sm w-full h-12 rounded-md  text-black"
                      placeholder="Password"
                    />

                    <button
                      className="p-2 mt-7 w-full h-12 text-white bg-neutral-700 rounded-md"
                      onClick={() => setFormMode("new2")}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              ) : !isLoading && formMode && formMode === "new2" ? (
                <div className="flex flex-col justify-center items-center h-full w-full px-4">
                  <form className="flex flex-col w-full">
                    <input
                      ref={emailRef}
                      type="email"
                      id="userEmail"
                      autoComplete="off"
                      onChange={(e) => setUserEmail(e.target.value)}
                      value={userEmail}
                      required
                      className="p-2 mt-3 text-sm w-full h-12 rounded-md text-black"
                      placeholder="Email Address"
                    />
                    <input
                      type="number"
                      id="cno"
                      onChange={(e) => setCardNo(e.target.value)}
                      value={cardNo}
                      required
                      className="p-2 mt-3 text-sm w-full h-12 rounded-md  text-black"
                      placeholder="Card Number"
                    />
                    <div className="flex flex-row w-full justify-start items-center">
                      <input
                        type="number"
                        id="zipcode"
                        onChange={(e) => setZipcode(e.target.value)}
                        value={zipcode}
                        required
                        className="p-2 mt-3 mr-1 text-sm h-12 w-2/4 rounded-md  text-black"
                        placeholder="Zipcode"
                      />
                      <input
                        type="number"
                        id="cvc"
                        onChange={(e) => setCvc(e.target.value)}
                        value={cvc}
                        required
                        className="p-2 mt-3 ml-1 text-sm h-12 w-2/4 rounded-md  text-black"
                        placeholder="CVC"
                      />
                    </div>

                    <button className="p-2 mt-7 w-full h-12 text-white bg-neutral-700 rounded-md">
                      Submit
                    </button>
                  </form>
                </div>
              ) : !isLoading &&
                !existLoginSuccess &&
                formMode &&
                formMode === "existing" &&
                !auth.id &&
                !auth.meta_username &&
                !auth.public_hashkey ? (
                <div className="flex flex-col justify-center items-center h-full w-full px-4">
                  <form
                    className="flex flex-col w-full"
                    onSubmit={handleExistLogin}
                  >
                    <input
                      ref={userUnameRef}
                      type="text"
                      id="username"
                      autoComplete="off"
                      onChange={(e) => setUserUname(e.target.value)}
                      value={userUname}
                      required
                      className="p-2 mt-3 text-sm w-full h-12 rounded-md text-black"
                      placeholder="Username"
                    />
                    <input
                      type="password"
                      id="pwd2"
                      onChange={(e) => setPwd2(e.target.value)}
                      value={pwd2}
                      required
                      className="p-2 mt-3 text-sm w-full h-12 rounded-md  text-black"
                      placeholder="Password"
                    />
                    <button className="p-2 mt-7 w-full h-12 text-white bg-neutral-700 rounded-md">
                      Login
                    </button>
                  </form>
                </div>
              ) : !isLoading &&
                existLoginSuccess &&
                formMode &&
                formMode === "existing2" &&
                auth.id &&
                auth.meta_username &&
                auth.public_hashkey ? (
                <div className="flex flex-col justify-center items-center h-full w-full px-4 text-white">
                  <h1>You're already logged in</h1>
                  <h1>as {" " + auth.meta_username}</h1>
                  <button
                    className="p-2 w-full h-12 mt-6 bg-neutral-700 rounded-md text-white"
                    onClick={() => handleExistingLogout()}
                  >
                    Logout?
                  </button>
                </div>
              ) : (
                <></>
              )
              //           : (
              //   !isLoading &&
              //   existLoginSuccess &&
              //   auth.id &&
              //   auth.meta_username &&
              //   auth.public_hashkey && (
              //     <div className="flex flex-col justify-center items-center h-full w-full px-4 text-white">
              //       <h1>Login Successful!</h1>
              //     </div>
              //   )
              // )
            }
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal2;
