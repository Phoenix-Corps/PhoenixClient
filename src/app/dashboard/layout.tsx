import { Metadata } from "next";

import { Footer } from "@/app/dashboard/components/footer/Footer";
import { Header } from "@/app/dashboard/components/header/Header";

import TeamWrapper from "./TeamWrapper";

import "@/app/dashboard/styles/globals.css";
import "@radix-ui/themes/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "Phoenix Shinobi",
  description: "Phoenix Shinobi"
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
