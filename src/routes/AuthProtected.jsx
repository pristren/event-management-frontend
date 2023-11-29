import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const location = useLocation();
  const state = useSelector((state) => state.auth);

  const { user, accessToken } = state || {};

  return !user && !accessToken ? (
    <Navigate to={{ pathname: "/", state: { from: location } }} />
  ) : (
    children
  );
};

export default AuthProtected;
