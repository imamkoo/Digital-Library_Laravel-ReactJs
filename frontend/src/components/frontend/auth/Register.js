import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
// import Navbar from "../../../layouts/frontend/Navbar";
import registerLogo from "../../../assets/register.svg";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          navigate("/");
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <main className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src={registerLogo} className="img-fluid" alt="PhoneImage" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={registerSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form1Example13">
                    Name
                  </label>
                  <input
                    type="text"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    onChange={handleInput}
                    value={registerInput.name}
                    required
                  />
                  <span className="text-danger">
                    {registerInput.error_list.name}
                  </span>
                </div>

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
                    value={registerInput.email}
                    required
                  />
                  <span className="text-danger">
                    {registerInput.error_list.email}
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
                    value={registerInput.password}
                    required
                  />
                  <span className="text-danger">
                    {registerInput.error_list.password}
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg btn-block"
                  >
                    Sign up
                  </button>

                  <Link
                    className=" btn btn-outline-dark btn-lg btn-block"
                    to="/login"
                  >
                    Log In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
