import "@/app/dashboard/styles/globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import Footer from "@/app/dashboard/components/footer";
import Header from "@/app/dashboard/components/header";
import { Metadata } from "next";

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
      <div className="w-full mx-auto  ">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}
