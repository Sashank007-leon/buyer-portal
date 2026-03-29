import React, { useState } from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login({ ...res.data.user, token: res.data.token });
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
