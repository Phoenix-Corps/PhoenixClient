import { Metadata } from "next";

import { Footer } from "@/components/pages/dashboard/Footer";
import { Header } from "@/components/pages/dashboard/Header";

import TeamWrapper from "./TeamWrapper";

import "@/app/dashboard/styles/globals.css";

import "@radix-ui/themes/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "Phoenix Dashboard",
  description: "Phoenix Dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-full mx-auto">
        <Header />
        <TeamWrapper>{children}</TeamWrapper>
      </div>
      <Footer />
    </div>
  );
}
