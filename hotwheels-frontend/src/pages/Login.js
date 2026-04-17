import React, { useState } from "react";
import axios from "axios";
// import { useEffect } from "react";

// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     window.location.href = "/";
//   }
// }, []);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      // Redirect
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full mb-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3">
        New user?{" "}
        <span
        onClick={() => (window.location.href = "/register")}
        className="text-blue-500 cursor-pointer"
        >
        Create account
        </span>
        </p>
      </div>
    </div>
  );
}

export default Login;