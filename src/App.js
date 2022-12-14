import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
// import Register from "./components/Register";
import Login from "./components/Login";
// import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Support from "./components/Support.js";
import Shops from "./components/Shops.js";
import UserProductDetail from "./components/UserProductDetail";
import ShopDetails from "./components/ShopDetails";

const App = () => {
  return (
    <div className="main-cont flex flex-col justify-center items-center bg-transparent">
      <div className="container sm:w-full max-w-md bg-transparent justify-center">
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<Profile />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/product/:pid" element={<ProductDetails />} />
          <Route path="/:id/:pid" element={<UserProductDetail />} />
          <Route exact path="/shops" element={<Shops />} />
          <Route path="/shop/:sid" element={<ShopDetails />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          <Route exact path="/support" element={<Support />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Protected Routes */}
          {/* <Route element={<RequireAuth />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* </Route> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
