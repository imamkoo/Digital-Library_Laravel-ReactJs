import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";

import routes from "./routes/routes";
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="login"
            element={
              localStorage.getItem("auth_token") ? (
                <Navigate to="/" />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="register"
            element={
              localStorage.getItem("auth_token") ? (
                <Navigate to="/" />
              ) : (
                <Register />
              )
            }
          />

          <Route path="/admin" element={<MasterLayout />}>
            {routes
              .filter((route) => route.component)
              .map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            <Route index element={<Navigate to="/admin/dashboard" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
