"use client";

import React, { useState } from "react";
import AccessCodeScreen from "./components/AccessCodeScreen";
import PresaleContainer from "./components/PresaleContainer";
import { isValidAccessCode } from "./utils/contractInteraction";
import SuspenseBoundary from "./components/SuspenseBoundry";

const Home: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string | null>(null);

  const handleAccessCodeSubmit = (code: string) => {
    setAccessCode(code);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!accessCode ? (
        <AccessCodeScreen onSubmit={handleAccessCodeSubmit} />
      ) : (
        <PresaleContainer accessCode={accessCode} />
      )}
    </div>
  );
};

const BuyPageWithSuspense: React.FC = () => {
  return (
    <SuspenseBoundary fallback={<div>Loading...</div>}>
      <Home />
    </SuspenseBoundary>
  );
};

export default BuyPageWithSuspense;


