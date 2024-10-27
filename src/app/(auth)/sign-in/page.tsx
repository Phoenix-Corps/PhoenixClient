"use client";

import Dropdown from "@/components/dropdown/Dropdown";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import PHOENIX from "@public/images/phoenix.png";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "@/lib/services/auth";
import { useState } from "react";
import Link from "next/link";

const SignIn = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result.type === "shinobi") {
        return push(`https://shinobi.${process.env.NEXT_PUBLIC_DOMAIN}`);
      }
      if (result.type === "army") {
        return push(`https://army.${process.env.NEXT_PUBLIC_DOMAIN}`);
      }
   
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  return (
    <>
      <div className="login-bg">
        <div className="header-container" style={{ alignItems: "center" }}>
          <div className="phoenix-container">
            <Image
              alt="cursor discord"
              src={PHOENIX}
              className="phoenix-logo"
              onClick={() => push("/")}
            />
          </div>
          <Dropdown />
        </div>

        <div className="signin-card">
          <h1 className="noto-serif">Sign In</h1>
          <form>
            <input
              className="input"
              type="text"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <br />
            <br />

            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Link href="/forgot-password" className="forget-password">
              Forgot your password?
            </Link>

            <span className="signin-btn-container">
              <button
                className="signin-btn"
                onClick={e => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <span className="signin-btn-text">Sign In</span>
              </button>
            </span>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignIn;
