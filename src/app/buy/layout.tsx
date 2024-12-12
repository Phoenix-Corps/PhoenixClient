import { Header } from "@/components/Header";

import "@/app/buy/styles/globals.css";
import "@/app/buy/styles/global.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="min-h-screen main-air-wrapper text-white">
        <Header />
        {children}
      </div>
    </div>
  );
}
