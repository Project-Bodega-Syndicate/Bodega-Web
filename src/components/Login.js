import { useRef, useState, useEffect } from "react";
// import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import BDGLOGO from "../img/proj-bdg.png";
import {
  Link,
  useNavigate,
  // useLocation,
  // Navigate,
} from "react-router-dom";
// import axios from "../api/axios";
import axios from "axios";
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [userKey, setUserKey] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(LOGIN_URL + user + "/", {
        headers: headers,
        // meta_username: user,
        passcode: pwd,
        public_hashkey: userKey,
      });
      // console.log(response?.data);
      // console.log(JSON.stringify(response.data));
      setIsLoading(false);
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
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
          user,
          pwd,
          userKey,
          // roles, accessToken
        });
        setSuccess(true);
        navigate(`/${user}`, { replace: true });
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

  // useEffect(() => {
  //   if (success) {
  //     // navigate(`/${user}`);
  //     navigate("/dashboard");
  //   }
  // }, [success, navigate]);

  return (
    <div className="flex flex-col justify-start items-center h-screen w-full text-white px-4 pt-10">
      <img alt="Project Bodega" src={BDGLOGO} className="w-screen"></img>
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
      ) : (
        // ) : success && user && pwd && userKey && !isLoading ? (
        //   // <Navigate to={`/${user}`} state={{ from: location }} replace />

        //   <div className="flex flex-col justify-center items-center h-full">
        //     <h1>Login Successful</h1>
        //     <br />
        //     <p>
        //       <Link
        //         className="decoration-blue-700 underline text-sm text-blue-700 mt-6"
        //         to={"/dashboard"}
        //       >
        //         Go to Dashboard
        //       </Link>
        //     </p>
        //   </div>
        <>
          <p className="text-3xl mt-10">Login</p>
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
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="p-1 mt-3 text-sm w-full h-12 rounded-md bg-neutral-800 text-white"
              placeholder="Username"
            />

            <label htmlFor="password" className="mt-4 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="p-1 mt-3 text-sm w-full h-12 rounded-md bg-neutral-800 text-white"
              placeholder="Password"
            />

            <label htmlFor="pubKey" className="mt-4 block">
              Public Hashkey
            </label>
            <input
              type="text"
              id="pubKey"
              autoComplete="off"
              onChange={(e) => setUserKey(e.target.value)}
              value={userKey}
              required
              className="p-1 mt-3 text-sm w-full h-14 rounded-md bg-neutral-800 text-white"
              placeholder=""
            />

            <button
              className="p-2 mt-4 w-full h-8 text-xs bg-neutral-700 rounded-md"
              disabled={true}
            >
              Have a Referral Code?
            </button>

            <button className="p-2 mt-7 w-full h-12 bg-neutral-700 rounded-md">
              Login
            </button>
          </form>
          <Link
            className="decoration-blue-700 underline text-sm text-blue-700 mt-4"
            to={"/register"}
          >
            Don't have an account?
          </Link>
        </>
      )}
    </div>
  );
};

export default Login;
