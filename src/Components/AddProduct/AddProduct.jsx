import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.png";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "tea",
    new_price: "",
    old_price: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    if (!image || !productDetails.name || !productDetails.old_price || !productDetails.new_price) {
      return alert("Please fill all fields and upload an image.");
    }

    setLoading(true);

    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append("product", image);

      const uploadResp = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResp.json();

      if (!uploadData.success) {
        throw new Error("Image upload failed");
      }

      // 2. Submit product with image URL
      const productPayload = {
        ...productDetails,
        image: uploadData.image_url,
        old_price: Number(productDetails.old_price),
        new_price: Number(productDetails.new_price),
      };

      const addResp = await fetch(`${apiUrl}/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productPayload),
      });

      const addData = await addResp.json();

      if (addData.success) {
        alert("✅ Product added successfully!");
        setProductDetails({
          name: "",
          image: "",
          category: "tea",
          new_price: "",
          old_price: "",
        });
        setImage(null);
      } else {
        alert("❌ Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Old Price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="New Price"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
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
            alt="Upload Preview"
            className="addproduct-thumbnail-img"
            width={100}
            height={100}
          />
        </label>
        <input
          id="file-input"
          type="file"
          name="image"
          accept="image/*"
          onChange={imageHandler}
          hidden
        />
      </div>

      <button
        className="addproduct-btn"
        onClick={handleAddProduct}
        disabled={loading}
      >
        {loading ? "Adding..." : "ADD"}
      </button>
    </div>
  );
};

export default AddProduct;