import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { XMarkIcon, CheckIcon } from "@heroicons/react/20/solid";
import CopyText1 from "../img/home/Copy1.svg";
import CopyText2 from "../img/home/Copy2.svg";
import AppleLogo from "../img/AppleLogo.svg";
import main0 from "../img/home/new/main0.png";
import main1 from "../img/home/new/main1.png";
import main2 from "../img/home/new/main2.png";
import main3 from "../img/home/new/main3.png";
import main4 from "../img/home/new/main4.png";
import main5 from "../img/home/new/main5.png";
import why0 from "../img/why/why0.png";
import why1 from "../img/why/why1.png";
import why2 from "../img/why/why2.png";
import why3 from "../img/why/why3.png";
import why4 from "../img/why/why4.png";

//eslint-disable-next-line
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Home = () => {
  const [userEmail, setUserEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const whyRef = useRef();
  const errRef = useRef();

  const scrollToRef = (ref) => {
    // window.scrollTo(0, ref.current.offsetTop)
    // ref.current?.scrollIntoView({ behavior: "smooth" });

    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(userEmail);
    if (!v1) {
      setErrMsg("Invalid Email");
      return;
    }
    try {
      const headers = { "Content-Type": "application/json" };

      const res = await axios.post(
        process.env.REACT_APP_FIREBASE_URL,
        JSON.stringify(userEmail),
        { headers: headers }
      );
      if (res) {
        console.log(res.data);
        setSuccess(true);
        setUserEmail("");
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleWhyBtn = () => {
    setShowWhy(true);
  };

  useEffect(() => {
    if (showWhy && whyRef.current) {
      scrollToRef(whyRef);
    }
  }, [showWhy]);

  // const scrollTo = (ref) => {
  //   if (ref && ref.current) {
  //     ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(userEmail));
  }, [userEmail]);

  useEffect(() => {
    setErrMsg("");
  }, [userEmail]);

  return (
    <div className="flex flex-col justify-center items-left w-full text-white">
      <header className="flex flex-col flex-start w-full py-4 px-2 border-b-2">
        <p>{">"}Project Bodega</p>
      </header>
      <div className="flex flex-col justify-center mt-6 mb-10">
        <div className="flex max-w-full justify-center">
          {/* <p
            className=""
            style={{
              lineHeight: "0.75rem",
              fontSize: "0.55rem",
              fontWeight: 100,
            }}
          >
            Every Creator should be able to build a home for their creativity.
          </p> */}
          <img alt="" src={CopyText1}></img>
        </div>
        {/* <div className="flex max-w-full px-2 justify-center">
          <img alt="" src={CopyText2}></img>
        </div> */}
        <div
          className="flex flex-row justify-start items-start"
          // style={{ backgroundImage: `url(${StarBackground})` }}
        >
          <div className="mt-2">
            <img
              alt=""
              className="relative left-0 my-1 w-4"
              src={CopyText2}
            ></img>
          </div>
          <div className="flex flex-col items-center w-full mt-4 px-6">
            <img className="w-full" alt="" src={main0}></img>
            <div
              className="flex flex-row justify-center items-center bg-white text-black w-64 px-6 py-3 cursor-pointer my-10"
              onClick={() => {
                window.open(process.env.REACT_APP_BDG_APPLINK, "_blank");
              }}
            >
              <img alt="" className="w-8 mr-4" src={AppleLogo}></img>
              <div className="flex flex-col min-w-10/12 justify-center items-center">
                <p className="inline text-xs">Download on the</p>
                <p className="inline text-xl">App Store</p>
              </div>
            </div>
            <img className="my-2" alt="" src={main2}></img>
            <img className="my-2" alt="" src={main1}></img>
            <img className="my-2" alt="" src={main3}></img>
            <img className="my-2" alt="" src={main4}></img>
            <img className="my-2" alt="" src={main5}></img>

            <div className="flex flex-col w-full justify-center mt-16 pb-20">
              <form className="flex flex-col justify-center items-center w-full mt-4">
                <div className="flex flex-col justify-start w-4/5">
                  <p
                    ref={errRef}
                    className={
                      errMsg
                        ? "text-red-700 font-bold mb-2 mt-8 rounded-lg"
                        : "absolute hidden"
                    }
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>

                  {success && <p>Successfully Registered!</p>}

                  <label htmlFor="email" className="mt-4 block">
                    Email Address
                    <CheckIcon
                      className={
                        validEmail
                          ? "text-lime-500 ml-1 h-6 w-6 inline-block"
                          : "hidden"
                      }
                    />
                    <XMarkIcon
                      className={
                        validEmail || !userEmail
                          ? "hidden"
                          : "text-red-600 ml-1 h-6 w-6 inline-block"
                      }
                    />
                  </label>
                </div>
                <input
                  type="text"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                  required
                  className="p-4 text-sm w-4/5 h-12 mt-4 bg-black text-white border-2 border-white placeholder:text-white placeholder:text-xs placeholder:font-thin"
                  // placeholder="Enter E-mail Address"
                />

                {/* <div className="flex flex-col justify-center items-center"> */}
                <button
                  className="p-2 mt-8 h-12 w-44 bg-white text-black"
                  onClick={handleSubmit}
                >
                  Subscribe
                </button>
                {/* </div> */}
              </form>
              <div className="flex justify-center items-center">
                <button
                  className="border-2 border-white w-44 p-2 mt-8 bg-black text-white"
                  onClick={() => {
                    handleWhyBtn();
                  }}
                >
                  Why Bodega?
                </button>
              </div>
            </div>
            {showWhy ? (
              <div
                className="flex flex-col items-center w-full mt-4"
                ref={whyRef}
              >
                <img className="w-full" alt="" src={why0}></img>

                <img className="mb-6" alt="" src={why1}></img>
                <img className="my-6" alt="" src={why2}></img>
                <img className="my-6" alt="" src={why3}></img>
                <img className="my-6" alt="" src={why4}></img>
                <div
                  className="flex flex-row justify-center items-center bg-white text-black w-64 px-6 py-3 cursor-pointer my-10"
                  onClick={() => {
                    window.open(process.env.REACT_APP_BDG_APPLINK, "_blank");
                  }}
                >
                  <img alt="" className="w-8 mr-4" src={AppleLogo}></img>
                  <div className="flex flex-col min-w-10/12 justify-center items-center">
                    <p className="inline text-xs">Download on the</p>
                    <p className="inline text-xl">App Store</p>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
