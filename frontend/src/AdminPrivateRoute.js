import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function AdminPrivateRoute() {
  const navigate = useNavigate();

  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get(`/api/checkingAuthenticated`).then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
      }
      setloading(false);
    });

    return () => {
      setAuthenticated(false);
    };
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        swal("Unauthorized", err.response.data.message, "warning");
        navigate("/");
      }
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 403) {
        // Access Denied
        swal("Forbidden", error.response.data.message, "warning");
        navigate("/403");
      } else if (error.response.status === 404) {
        //Page Not Found
        swal("404 Error", "Url/Page Not Found", "warning");
        navigate("/404");
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return Authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminPrivateRoute;
