import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

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
