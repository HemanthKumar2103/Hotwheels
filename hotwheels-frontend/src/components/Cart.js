import React from "react";

function Cart({
  cart,
  removeFromCart,
  handleCheckout,
  addToCart,
  showCart,
  setShowCart,
}) {
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  

  return (
    <>
      {/* OVERLAY */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setShowCart(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">🛒 Cart</h2>
          <button onClick={() => setShowCart(false)}>✕</button>
        </div>

        {/* ITEMS */}
        <div className="p-5 overflow-y-auto h-[70%]">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center">
              Cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="mb-4 border-b pb-3"
              >
                {/* ❌ DELETE BUTTON (TOP RIGHT) */}
                <button
                onClick={() => removeFromCart(item.productId, true)}
                className="absolute top-0 right-0 text-gray-400 hover:text-red-500 text-sm"
                >
                ✕
                </button>
                <p className="font-semibold">{item.name}</p>

                <div className="flex justify-between items-center mt-2">
                  <span>₹{item.price}</span>

                  {/* 🔥 QUANTITY CONTROLS */}
                  <div className="flex gap-2 items-center">

                    {/* ➖ DECREASE */}
                    <button
                      onClick={() =>
                        removeFromCart(item.productId)
                      }
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.qty}
                    </span>

                    {/* ➕ INCREASE */}
                    <button
                      onClick={() =>
                        addToCart({
                          _id: String(item.productId),
                          name: item.name,
                          price: item.price,
                        })
                      }
                      className="bg-green-500 text-white px-2 rounded"
                    >
                      +
                    </button>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t">
          <div className="flex justify-between font-bold text-lg mb-3">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="bg-yellow-500 hover:bg-yellow-600 w-full p-2 rounded font-semibold transition"
          >
            Proceed to Buy
          </button>
        </div>
      </div>
      
    </>
    
  );
}


export default Cart;