import React, { useState } from "react";

import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

// import Navbar from "../../../layouts/frontend/Navbar";
import { Link } from "react-router-dom";
import loginLogo from "../../../assets/login.svg";

function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          if (res.data.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src={loginLogo} className="img-fluid" alt="PhoneImage" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={loginSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form1Example13">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                    value={loginInput.email}
                    required
                  />
                  <span className="text-danger">
                    {loginInput.error_list.email}
                  </span>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" for="form1Example23">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                    value={loginInput.password}
                    required
                  />
                  <span className="text-danger">
                    {loginInput.error_list.password}
                  </span>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <Link to="#">Forgot password?</Link>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg btn-block"
                  >
                    Sign in
                  </button>

                  <Link
                    to="/register"
                    className="btn btn-outline-dark btn-lg btn-block"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
