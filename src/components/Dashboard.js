import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Dashboard = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen w-full text-white">
      <p className="mt-10">Dashboard</p>
      <button className="mt-6 text-blue-700" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
