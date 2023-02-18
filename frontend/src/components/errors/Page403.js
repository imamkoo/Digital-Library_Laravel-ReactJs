import React from "react";
import error403 from "../../assets/denied.svg";

function Page403() {
  return (
    <main className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={error403} className="img-fluid" alt="errorImage" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="card card-body">
              <h1>Page 403 | Forbidden </h1>
              <h3>Access Denied !!! You are not an Admin</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page403;
