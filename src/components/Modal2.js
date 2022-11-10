import React, {
  useRef,
  useEffect,
  // useCallback,
  useState,
} from "react";
// import useAppContext from "../hooks/useAppContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const Modal2 = ({ showModal, setShowModal }) => {
  // const { singlePrd } = useAppContext();
  const modalRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();

  const [formMode, setFormMode] = useState("initial");
  const [fullName, setFullName] = useState("");
  const [pwd, setPwd] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cvc, setCvc] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

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
    }
  }, [formMode, nameRef, emailRef]);

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
    }
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
            {formMode && formMode === "initial" ? (
              <div className="flex flex-col justify-center items-center h-full px-2">
                <button
                  className="p-2 w-full h-12 bg-neutral-700 rounded-md text-white"
                  onClick={() => setFormMode("existing")}
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
            ) : formMode === "new" ? (
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
            ) : formMode && formMode === "new2" ? (
              <div className="flex flex-col justify-center items-center h-full w-full px-4">
                <form className="flex flex-col w-full">
                  <input
                    ref={emailRef}
                    type="email"
                    id="userEmail"
                    autoComplete="off"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    // required
                    className="p-2 mt-3 text-sm w-full h-12 rounded-md text-black"
                    placeholder="Email Address"
                  />
                  <input
                    type="number"
                    id="cno"
                    onChange={(e) => setCardNo(e.target.value)}
                    value={cardNo}
                    // required
                    className="p-2 mt-3 text-sm w-full h-12 rounded-md  text-black"
                    placeholder="Card Number"
                  />
                  <div className="flex flex-row w-full justify-start items-center">
                    <input
                      type="number"
                      id="zipcode"
                      onChange={(e) => setZipcode(e.target.value)}
                      value={zipcode}
                      // required
                      className="p-2 mt-3 mr-1 text-sm h-12 w-2/4 rounded-md  text-black"
                      placeholder="Zipcode"
                    />
                    <input
                      type="number"
                      id="cvc"
                      onChange={(e) => setCvc(e.target.value)}
                      value={cvc}
                      // required
                      className="p-2 mt-3 ml-1 text-sm h-12 w-2/4 rounded-md  text-black"
                      placeholder="CVC"
                    />
                  </div>

                  <button className="p-2 mt-7 w-full h-12 text-white bg-neutral-700 rounded-md">
                    Submit
                  </button>
                </form>
              </div>
            ) : formMode && formMode === "existing" ? (
              <div></div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal2;
