import React, { useState } from "react";

const ADMIN_EMAILS = ["test@gmail.com"];

function Navbar({ cartCount, user, setShowCart }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 sm:px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">

      {/* LOGO */}
      <h1 className="text-xl sm:text-2xl font-extrabold">
        Hot Wheels 🚗🔥
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* CART (ALWAYS VISIBLE) */}
        <button
          onClick={() => setShowCart(true)}
          className="bg-white text-black px-3 py-1 rounded-full font-semibold flex items-center gap-1"
        >
          🛒 {cartCount}
        </button>

        {/* USER NAME */}
        {user && (
          <span className="hidden sm:block text-sm">
            {user.name}
          </span>
        )}

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-3">

          {user ? (
            <>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-blue-500 px-3 py-1 rounded"
            >
              Login
            </button>
          )}

          <button
            onClick={() => (window.location.href = "/orders")}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Orders
          </button>

          {user &&
            ADMIN_EMAILS.includes(user.email?.toLowerCase()) && (
              <button
                onClick={() => (window.location.href = "/admin")}
                className="bg-yellow-400 text-black px-3 py-1 rounded"
              >
                Admin
              </button>
            )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="sm:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {openMenu && (
        <div className="absolute top-16 right-4 bg-white text-black rounded-lg shadow-lg w-40 p-3 flex flex-col gap-2 sm:hidden">

          {user ? (
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Login
            </button>
          )}

          <button
            onClick={() => (window.location.href = "/orders")}
            className="text-left hover:bg-gray-100 p-2 rounded"
          >
            Orders
          </button>

          {user &&
            ADMIN_EMAILS.includes(user.email?.toLowerCase()) && (
              <button
                onClick={() => (window.location.href = "/admin")}
                className="text-left hover:bg-gray-100 p-2 rounded"
              >
                Admin
              </button>
            )}
        </div>
      )}
    </div>
  );
}

export default Navbar;