"use client";

import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { isValidAccessCode } from "../utils/contractInteraction";
import { useSearchParams } from "next/navigation";

interface AccessCodeScreenProps {
  onSubmit: (code: string) => void;
}

const AccessCodeScreen: React.FC<AccessCodeScreenProps> = ({ onSubmit }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();
  const [presaleId, setPresaleId] = useState("");

  useEffect(() => {
    const presaleIdValue = searchParams.get("presaleId");
    const codeValue = searchParams.get("code");

    setPresaleId(presaleIdValue || "");
    setCode(codeValue || "");
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const isValid = await isValidAccessCode(code);
      if (isValid) {
        onSubmit(code);
      } else {
        setError("Invalid access code");
      }
    } catch (error) {
      console.error("Error validating access code:", error);
      setError("Error validating access code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Presale</h1>
      {!isConnected ? (
        <div className="text-center items-center flex flex-col justify-center">
          <p className="mb-4">Connect your wallet to continue</p>
          <ConnectButton />
        </div>
      ) : (
        <div className="w-full max-w-sm items-center flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4">Enter access code</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter access code"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              maxLength={8}
            />
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !code}
            >
              {isLoading ? "Validating..." : "CONTINUE"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default AccessCodeScreen;
