import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewProduct() {
  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "View Product";

    axios.get(`/api/view-product`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.product);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  var display_Productdata = "";
  if (loading) {
    return <h4>View Products Loading...</h4>;
  } else {
    display_Productdata = viewProduct.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td>{item.pengarang}</td>
          <td>{item.penerbit}</td>
          <td>
            <img
              src={`http://localhost:8000/${item.image}`}
              width="50px"
              alt={item.name}
            />
          </td>
          <td>
            <Link
              to={`/admin/edit-product/${item.id}`}
              className="btn btn-dark btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>{item.broken === 0 ? "Available" : "Broken"}</td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4 mt-3">
      <div className="card">
        <div className="card-header">
          <h4>
            View Product
            <Link
              to="/admin/add-product"
              className="btn btn-dark btn-sm float-end"
            >
              Add Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Pengarang</th>
                  <th>Penerbit</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{display_Productdata}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
