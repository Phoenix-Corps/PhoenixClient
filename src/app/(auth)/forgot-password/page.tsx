"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PHOENIX from "@public/images/phoenix.png";
import { sendOTP } from "@/actions";
import Dropdown from "@/components/dropdown/Dropdown";
import Footer from "@/components/footer/footer";

const ForgotPassword: React.FC = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await sendOTP(email);

      push("/sign-in");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="noto-serif">Forgot Password</h1>
          <form>
            <input
              className="input"
              type="text"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Link href="/sign-in" className="forget-password">
              Sign in
            </Link>

            <span className="signin-btn-container">
              <button className="signin-btn" onClick={handleSendOTP}>
                <span className="signin-btn-text">
                  {loading ? "Sending OTP" : "Send OTP"}
                </span>
              </button>
            </span>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForgotPassword;
