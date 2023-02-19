import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import routes from "./routes/routes";
import AdminPrivateRoute from "./AdminPrivateRoute";
import MasterLayout from "./layouts/admin/MasterLayout";
import Home from "./components/frontend/Home";
import About from "./components/frontend/About";
import Contact from "./components/frontend/Contact";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import Page403 from "./components/errors/Page403.js";
import Page404 from "./components/errors/Page404.js";

import axios from "axios";
import ViewCategory from "./components/frontend/collections/ViewCategory";
import ViewProduct from "./components/frontend/collections/ViewProduct";
import ProductDetail from "./components/frontend/collections/ProductDetail";
import Cart from "./components/frontend/Cart";

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collections" element={<ViewCategory />} />
          <Route path="/collections/:slug" element={<ViewProduct />} />
          <Route
            path="/collections/:category/:product"
            element={<ProductDetail />}
          />
          <Route path="/cart" element={<Cart />} />

          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />

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

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin" element={<MasterLayout />}>
              {routes
                .filter((route) => route.component)
                .map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              <Route index element={<Navigate to="/admin/dashboard" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
