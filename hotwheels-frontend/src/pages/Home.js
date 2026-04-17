import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Protect route
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) window.location.href = "/login";
  // }, []);

  // Fetch products
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  useEffect(() => {
  if (!user?._id) return;

  axios
    .get(`http://localhost:5000/api/cart/${user._id}`)
    .then((res) => setCart(res.data.items))
    .catch((err) => console.log(err));
}, [user]);
  //Add to cart section 

  const addToCart = async (product) => {

  try {
    const res = await axios.post(
      "http://localhost:5000/api/cart/add",
      {
        userId: user._id,
        product,
      }
    );

    setCart(res.data.items);
    // setShowCart(true);
  } catch (err) {
    console.log(err);
  }
};
  const removeFromCart = async (id, removeAll = false) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/cart/remove",
      {
        userId: user._id,
        productId: String(id),
        removeAll,
      }
    );

    setCart(res.data.items);
   } catch (err) {
    console.log(err);
   }
  };

 const handleCheckout = async () => {
  if (!user?._id) {
    alert("Please login to place order");
    window.location.href = "/login";
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/orders/place", {
      userId: user._id,
    });

    alert("Order placed successfully!");

    const res = await axios.get(
      `http://localhost:5000/api/cart/${user._id}`
    );
    setCart(res.data.items);
  } catch (err) {
    console.log(err);
  }
};
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar cartCount={cart.length} user={user}  setShowCart={setShowCart} />
      

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-5">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>

            <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            handleCheckout={handleCheckout}
            addToCart={addToCart}
            showCart={showCart}
            setShowCart={setShowCart}
            />
      </div>
    </div>
  );
  // console.log("USER:", user);
}

export default Home;