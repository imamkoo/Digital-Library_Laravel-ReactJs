import React from "react";
import { Outlet } from "react-router-dom";
import "../../assets/admin/css/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../../assets/admin/js/scripts";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
