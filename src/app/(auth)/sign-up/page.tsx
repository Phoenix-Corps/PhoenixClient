// pages/sign-up.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const { push } = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {};

  return (
    <div className=" px-4 md:px-8">
      <div className="login-bg">
        <div className="signin-card">
          <h1 className="noto-serif">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className="signin-btn-container">
              <button type="submit" className="signin-btn" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </span>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/sign-in" className="text-gray-700 font-bold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
