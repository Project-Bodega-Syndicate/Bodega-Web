import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
// import Register from "./components/Register";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div className="main-cont flex flex-col justify-center items-center bg-transparent">
      <div className="container sm:w-full max-w-md h-screen bg-transparent justify-center">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Profile />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          <Route exact path="/login" element={<Login />} />
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
