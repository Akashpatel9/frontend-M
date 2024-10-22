import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/usercontext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const nevigate = useNavigate();

  useEffect(() => {
      nevigate("/");
  },[])
  return <div>ProtectedRoute</div>;
}

export default ProtectedRoute;
