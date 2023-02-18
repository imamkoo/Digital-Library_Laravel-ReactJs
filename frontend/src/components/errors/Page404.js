import React from "react";
import error404 from "../../assets/sitting.svg";

function Page404() {
  return (
    <main className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={error404} className="img-fluid" alt="errorImage" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="card card-body">
              <h1>Page 404 | Page Not Fount </h1>
              <h3>Page you are searching not found</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page404;
