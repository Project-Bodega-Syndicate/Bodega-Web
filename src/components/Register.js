import React from "react";
import { useRef, useEffect, useState } from "react";
import BDGLOGO from "../img/proj-bdg.png";
// import axios from "../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  CheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const DISC_REGEX =
  /^((?!(discordtag|everyone|here)#)((?!@|#|:|```).{2,32})#\d{4})/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = process.env.REACT_APP_REGISTER_URL;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userDisc, setUserDisc] = useState("");
  const [validDiscName, setValidDiscName] = useState(false);
  const [userDiscFocus, setUserDiscFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // const [matchPwd, setMatchPwd] = useState("");
  // const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef !== null) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidDiscName(DISC_REGEX.test(userDisc));
  }, [userDisc]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    // setValidMatch(pwd === matchPwd);
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, userDisc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = DISC_REGEX.test(userDisc);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(REGISTER_URL, {
        headers: headers,
        meta_username: user,
        passcode: pwd,
        discord_username: userDisc,
      });
      // console.log(response?.data);
      // console.log(JSON.stringify(response));
      if (response.data) {
        setIsLoading(false);
        if (response.data.id) {
          setSuccess(true);
        }
      }
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setUserDisc("");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else if (
        err.response?.data.meta_username[0] ===
        "meta user with this meta username already exists."
      ) {
        setErrMsg("Username already exists");
      } else {
        setErrMsg("Registration Failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-white px-4">
      {isLoading && !success ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-28 w-28"
          >
            <path
              d="M100 170C138.66 170 170 138.66 170 100C170 61.3401 138.66 30 100 30C61.3401 30 30 61.3401 30 100C30 138.66 61.3401 170 100 170Z"
              stroke="white"
              strokeWidth="20"
              strokeDasharray="329.87 113.96"
            />
          </svg>
        </div>
      ) : success && !isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <h1>Success!</h1>
          <br />
          <p>
            <Link
              className="decoration-blue-700 underline text-sm text-blue-700 mt-6"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
      ) : (
        <>
          <img alt="Project Bodega" src={BDGLOGO} className="w-screen"></img>
          <p className="text-3xl mt-10">Create an account</p>
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

          <form onSubmit={handleSubmit} className="flex flex-col w-full mt-4">
            <label htmlFor="username" className="mt-4 block">
              Username
              <CheckIcon
                className={
                  validName
                    ? "text-lime-500 ml-1 h-6 w-6 inline-block"
                    : "hidden"
                }
              />
              <XMarkIcon
                className={
                  validName || !user
                    ? "hidden"
                    : "text-red-600 ml-1 h-6 w-6 inline-block"
                }
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="p-1 mt-3 text-sm w-full h-14 rounded-md bg-neutral-800 text-white"
              placeholder="Username"
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? "text-xs rounded-lg	bg-red-500 p-1 relative text-white -bottom-2.5"
                  : "absolute hidden"
              }
            >
              <InformationCircleIcon className="mr-1 h-5 w-5 inline-block" />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="password" className="mt-4 block">
              Password
              <CheckIcon
                className={
                  validPwd
                    ? "text-lime-500 ml-1 h-6 w-6 inline-block"
                    : "hidden"
                }
              />
              <XMarkIcon
                className={
                  validPwd || !pwd
                    ? "hidden"
                    : "text-red-600 ml-1 h-6 w-6 inline-block"
                }
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="p-1 mt-3 text-sm w-full h-14 rounded-md bg-neutral-800 text-white"
              placeholder="Password"
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd
                  ? "text-xs rounded-lg	bg-red-500 p-1 relative text-white -bottom-2.5"
                  : "absolute hidden"
              }
            >
              <InformationCircleIcon className="mr-1 h-5 w-5 inline-block" />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="discusername" className="mt-4 block">
              Discord Username
              <CheckIcon
                className={
                  validDiscName
                    ? "text-lime-500 ml-1 h-6 w-6 inline-block"
                    : "hidden"
                }
              />
              <XMarkIcon
                className={
                  validDiscName || !userDisc
                    ? "hidden"
                    : "text-red-600 ml-1 h-6 w-6 inline-block"
                }
              />
            </label>
            <input
              type="text"
              id="discusername"
              autoComplete="off"
              onChange={(e) => setUserDisc(e.target.value)}
              value={userDisc}
              required
              aria-invalid={validDiscName ? "false" : "true"}
              aria-describedby="udiscnote"
              onFocus={() => setUserDiscFocus(true)}
              onBlur={() => setUserDiscFocus(false)}
              className="p-1 mt-3 text-sm w-full h-14 rounded-md bg-neutral-800 text-white"
              placeholder="discordUsername"
            />

            <p
              id="udiscnote"
              className={
                userDiscFocus && user && pwd && !validDiscName
                  ? "text-xs rounded-lg	bg-red-500 p-1 relative text-white -bottom-2.5"
                  : "absolute hidden"
              }
            >
              <InformationCircleIcon className="mr-1 h-5 w-5 inline-block" />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
            </p>

            <button
              className="p-2 mt-4 bg-neutral-700 rounded-md"
              disabled={!validName || !validPwd ? true : false}
            >
              Register
            </button>
          </form>
          <Link
            className="decoration-blue-700 underline text-sm text-blue-700 mt-6"
            to={"/login"}
          >
            Already have an account?
          </Link>
        </>
      )}
    </div>
  );
};
export default Register;
