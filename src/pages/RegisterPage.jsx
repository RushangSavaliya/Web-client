// File: src/pages/RegisterPage.jsx

import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

function RegisterPage() {
  // --- States Section ---

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // --- End States Section ---

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { username, email, password } = form;

    // Client-side validation
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (username.length < 3 || username.length > 20) {
      toast.error("Username must be between 3 and 20 characters");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed";
      toast.error(errorMsg);
      setLoading(false); // allow retry on failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        className="card w-full max-w-sm bg-base-100 shadow-md p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <FormInput
          label="Username"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary w-full mt-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link link-hover text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

function FormInput({ label, ...props }) {
  return (
    <div className="form-control">
      <label className="label">{label}</label>
      <input className="input input-bordered" required {...props} />
    </div>
  );
}

export default RegisterPage;
