import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${apiUrl}/allproducts`);
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch(`${apiUrl}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      await fetchInfo(); // Refresh the list after removal
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-header">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={product.id || index}>
            <div className="listproduct-format-main">
              <img
                className="listproduct-product-icon"
                src={product.image}
                alt="product"
              />
              <p>{product.name}</p>
              <p>RM{product.old_price}</p>
              <p>RM{product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => remove_product(product.id)}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Remove"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;