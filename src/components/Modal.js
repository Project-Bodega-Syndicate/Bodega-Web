import React, { useRef, useEffect, useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import AppleLogo from "../img/AppleLogo.svg";

const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  // const AppLink = process.env.REACT_APP_BDG_APPLINK

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        // console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div
          onClick={closeModal}
          ref={modalRef}
          className="flex flex-col justify-center items-center w-full h-full fixed bg-black/75"
        >
          <div className="flex flex-col justify-center items-center w-64 bg-white rounded-lg">
            <div className="flex flex-row min-w-full justify-end items-center pr-1">
              <XMarkIcon
                className="w-8 cursor-pointer align-right mt-1"
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </div>
            {/* <div className="flex flex-col justify-center items-center px-2 mt-6"> */}
            <div
              className="flex flex-row justify-center items-center bg-white text-black w-64 px-6 py-3 cursor-pointer my-2"
              onClick={() => {
                window.open(process.env.REACT_APP_BDG_APPLINK, "_blank");
              }}
            >
              <img alt="" className="w-8 mr-4" src={AppleLogo}></img>
              <div
                className="flex flex-col min-w-10/12 justify-center items-center"
                // onClick={() => window.open(AppLink, "_blank")}
              >
                <p className="inline text-xs">Download on the</p>
                <p className="inline text-xl">App Store</p>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
