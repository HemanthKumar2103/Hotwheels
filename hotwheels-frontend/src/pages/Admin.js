import React, { useState, useEffect } from "react";
import axios from "axios";

const ADMIN_EMAILS = ["test@gmail.com"];

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([""]);

  

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !ADMIN_EMAILS.includes(user.email)) {
        alert("Not authorized");
        window.location.href = "/";
      }
    }, []);


  // handle image input
  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post("http://localhost:5000/api/products", {
        name,
        price,
        description,
        images,
        email: user.email,
      });

      alert("Product added ✅");

      // reset
      setName("");
      setPrice("");
      setDescription("");
      setImages([""]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      {/* IMAGES */}
      <h2 className="font-semibold mb-2">Images</h2>

      {images.map((img, index) => (
        <input
          key={index}
          placeholder={`Image URL ${index + 1}`}
          value={img}
          onChange={(e) => handleImageChange(index, e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
      ))}

      <button
        onClick={addImageField}
        className="bg-gray-300 px-3 py-1 rounded mb-3"
      >
        + Add Image
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white w-full p-2 rounded"
      >
        Add Product
      </button>
    </div>
  );
}

export default Admin;