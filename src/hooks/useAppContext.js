import { useContext } from "react";
import AppContext from "../context/AppProvider";

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
