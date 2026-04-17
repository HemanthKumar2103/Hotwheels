import React, { useState } from "react";

function ProductCard({ product, addToCart }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showZoom, setShowZoom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState(false);

  const images = product.images || [];

  const handleNext = () => {
    if (images.length === 0) return;
    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // 🔍 ZOOM LOGIC
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };
  const flyToCart = (e) => {
  const cart = document.getElementById("cart-icon");
  const img = e.currentTarget
    .closest(".card-root")
    .querySelector("img");

  if (!cart || !img) return;

  const imgRect = img.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  const clone = img.cloneNode(true);

  clone.style.position = "fixed";
  clone.style.left = imgRect.left + "px";
  clone.style.top = imgRect.top + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";
  clone.style.zIndex = "9999";
  clone.style.transition = "all 0.8s cubic-bezier(0.65, -0.2, 0.25, 1.2)";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.left = cartRect.left + "px";
    clone.style.top = cartRect.top + "px";
    clone.style.width = "30px";
    clone.style.height = "30px";
    clone.style.opacity = "0.5";
  }, 10);

  setTimeout(() => {
    clone.remove();
  }, 800);
};

  return (
    <>
      <div className="card-root bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-4 flex flex-col group">

        {/* IMAGE SECTION */}
        <div
          className="relative overflow-hidden rounded-xl cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => {
            setShowZoom(false);
            setZoomStyle({});
          }}
          onClick={() => setShowModal(true)}
        >
          {images.length > 0 ? (
            <img
              src={images[selectedImage]}
              alt={product.name}
              style={showZoom ? zoomStyle : {}}
              className="h-52 w-full object-cover transition duration-200"
            />
          ) : (
            <div className="h-52 flex items-center justify-center bg-gray-200 text-gray-500 rounded-xl">
              No Image
            </div>
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition"></div>

          {/* ARROWS */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
              >
                ◀
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
              >
                ▶
              </button>
            </>
          )}
        </div>

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 justify-center">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(index)}
                className={`h-10 w-10 object-cover rounded-md cursor-pointer border-2 transition ${
                  selectedImage === index
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              />
            ))}
          </div>
        )}

        {/* DETAILS */}
        <div className="mt-3 flex flex-col flex-grow">

          <h2 className="font-semibold text-lg line-clamp-1">
            {product.name}
          </h2>

          <p className="text-gray-500 text-sm line-clamp-2 mt-1">
            {product.description}
          </p>

          {/* PRICE + BUTTON */}
          <div className="flex justify-between items-center mt-auto pt-3">

            <span className="text-green-600 font-bold text-lg">
              ₹{product.price}
            </span>

            <button
            onClick={(e) => {
            flyToCart(e);
            addToCart(product);

            setAdded(true);
            setTimeout(() => setAdded(false), 1000);
            }}
            className={`px-4 py-1.5 rounded-lg font-semibold shadow-md transition transform active:scale-95 ${
            added
            ? "bg-green-500 scale-110 text-white"
            : "bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white"
            }`}
            >
            {added ? "✓ Added" : "Add"}
            </button>

          </div>
        </div>
      </div>

      {/* 🖼 MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedImage]}
              alt=""
              className="max-h-[80vh] rounded-lg shadow-lg"
            />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-white px-3 py-1 rounded shadow"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;