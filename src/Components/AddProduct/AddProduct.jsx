import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.png";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "tea",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    try {
      const resp = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await resp.json();

      if (data.success) {
        product.image = data.image_url;

        const addResp = await fetch(`${apiUrl}/addproduct`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const addData = await addResp.json();
        addData.success ? alert("Product Added") : alert("Failed");

        setProductDetails({
          name: "",
          image: "",
          category: "tea",
          new_price: "",
          old_price: "",
        });
        setImage(false);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          onChange={changeHandler}
          type="text"
          name="name"
          value={productDetails.name}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            onChange={changeHandler}
            type="text"
            name="old_price"
            value={productDetails.old_price}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            onChange={changeHandler}
            type="text"
            name="new_price"
            value={productDetails.new_price}
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          onChange={changeHandler}
          name="category"
          value={productDetails.category}
          className="add-product-selector"
        >
          <option value="tea">Tea</option>
          <option value="coffee">Coffee</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
            width={100}
            height={100}
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;