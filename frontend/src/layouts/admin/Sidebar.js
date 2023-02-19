import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <Link className="nav-link" to="/admin">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </Link>

          <Link
            className="nav-link collapsed"
            to="#"
            data-bs-toggle="collapse"
            data-bs-target="#collapseProduct"
            aria-expanded="false"
            aria-controls="collapseProduct"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns"></i>
            </div>
            Products
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down"></i>
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseProduct"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/add-product">
                Add Product
              </Link>
              <Link className="nav-link" to="/admin/view-product">
                View Product
              </Link>
            </nav>
          </div>

          <Link
            className="nav-link collapsed"
            to="#"
            data-bs-toggle="collapse"
            data-bs-target="#collapseCategory"
            aria-expanded="false"
            aria-controls="collapseCategory"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns"></i>
            </div>
            Category
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down"></i>
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseCategory"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/add-category">
                Add Category
              </Link>
              <Link className="nav-link" to="/admin/view-category">
                View Category
              </Link>
            </nav>
          </div>

          <Link className="nav-link" to="/admin/profile">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Profile
          </Link>
        </div>
      </div>
      <div className="sb-sidenav-footer"></div>
    </nav>
  );
};

export default Sidebar;
