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
          <img alt="" src={BDGLOGO} className="w-screen"></img>
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
