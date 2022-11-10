import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    if (
      window.localStorage.getItem("id") &&
      window.localStorage.getItem("id") !== undefined &&
      window.localStorage.getItem("meta_username") &&
      window.localStorage.getItem("meta_username") !== undefined &&
      window.localStorage.getItem("public_hashkey") &&
      window.localStorage.getItem("public_hashkey") !== undefined
    ) {
      setAuth({
        id: parseInt(window.localStorage.getItem("id")),
        meta_username: window.localStorage.getItem("meta_username"),
        public_hashkey: window.localStorage.getItem("public_hashkey"),
      });
    }
  }, []);

  useEffect(() => {
    if (auth && auth.id && auth.meta_username && auth.public_hashkey) {
      window.localStorage.setItem("id", auth.id);
      window.localStorage.setItem("meta_username", auth.meta_username);
      window.localStorage.setItem("public_hashkey", auth.public_hashkey);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
