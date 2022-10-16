import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
import "./index.css";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/:id" element={<Profile />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
