import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import Profile3 from "./pages/Profile3";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Profile />} />
      {/* <Route path="pr/:id" element={<Profile3 />} /> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
