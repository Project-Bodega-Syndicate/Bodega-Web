import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
// import Register from "./components/Register";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  return (
    <div className="main-cont flex flex-col justify-center items-center bg-transparent">
      <div className="container sm:w-full max-w-md h-screen bg-transparent justify-center">
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<Profile />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          <Route path="*" element={<ErrorPage />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import "./index.css";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import ErrorPage from "./components/ErrorPage";
// // import Register from "./components/Register";
// import Login from "./components/Login";
// import RequireAuth from "./components/RequireAuth";
// import Dashboard from "./components/Dashboard";
// import Products from "./components/Products";
// import ProductDetails from "./components/ProductDetails";
// import axios from "axios";
// import Profile2 from "./components/Profile2.js";
// import useAppContext from "./hooks/useAppContext";

// const App = () => {
//   const { userData, setUserData, setSubdLoading, noUser, setNoUser } =
//     useAppContext();
//   const [reqUser, setReqUser] = useState("");
//   const [subdomain, setSubdomain] = useState(null);
//   const baseURL2 = process.env.REACT_APP_BASEURL2;

//   useEffect(() => {
//     const host = window.location.host;
//     const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);

//     if (arr.length > 0) {
//       setSubdomain(arr[0]);
//     }
//   }, []);

//   useEffect(() => {
//     if (subdomain) {
//       console.log("Subdomain: ", subdomain);
//     }
//   }, [subdomain]);

//   useEffect(() => {
//     if (subdomain && subdomain !== "") {
//       setReqUser(subdomain);
//     }
//   }, [subdomain]);

//   useEffect(() => {
//     if (reqUser && reqUser !== "") {
//       const fetchUserData = (u_name) => {
//         const fetchUserData = async (u_name) => {
//           try {
//             const headers = {
//               "Content-Type": "application/json",
//             };
//             const response = await axios.post(baseURL2, {
//               headers: headers,
//               metausername: u_name,
//             });
//             if (response) {
//               // console.log("API Response: ", response.data);
//               if (response.data.length === 0) {
//                 setSubdLoading(false);
//                 setNoUser(true);
//               } else {
//                 setUserData(response.data[0]);
//               }
//             }
//           } catch (err) {
//             console.log(err.response.data);
//           }
//         };
//         setSubdLoading(true);
//         fetchUserData(u_name);
//       };
//       fetchUserData(reqUser);
//     }
//   }, [reqUser]);

//   return (
//     <div className="main-cont flex flex-col justify-center items-center bg-transparent">
//       <div className="container sm:w-full max-w-md h-screen bg-transparent justify-center">
//         <Routes>
//           {/* Public Routes */}
//           {subdomain && subdomain !== "" && !noUser && userData ? (
//             <Route exact path="/" element={<Profile2 />} />
//           ) : noUser ? (
//             <Route path="/" element={<ErrorPage />} />
//           ) : (
//             <Route exact path="/" element={<Home />} />
//           )}
//           <Route path="/:id" element={<Profile />} />
//           <Route exact path="/products" element={<Products />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route exact path="/login" element={<Login />} />
//           {/* <Route exact path="/register" element={<Register />} /> */}
//           <Route path="*" element={<ErrorPage />} />

//           {/* Protected Routes */}
//           <Route element={<RequireAuth />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Route>
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;
