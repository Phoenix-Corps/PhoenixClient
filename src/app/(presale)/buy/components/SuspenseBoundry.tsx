// src/components/SuspenseBoundary.tsx
import React, { Suspense } from 'react';

const SuspenseBoundary: React.FC<{ fallback: React.ReactNode; children: React.ReactNode }> = ({ fallback, children }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default SuspenseBoundary;