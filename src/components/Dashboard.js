import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    localStorage.removeItem("id");
    localStorage.removeItem("meta_username");
    localStorage.removeItem("public_hashkey");
    setAuth({});
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen w-full text-white">
      <p className="mt-10">Dashboard</p>
      <NavLink to={`/${auth.user}`}>
        <p className="mt-16 text-blue-700">Go to your profile</p>
      </NavLink>
      <button className="mt-16 text-blue-700" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
