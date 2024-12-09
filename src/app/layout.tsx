import type { Metadata } from "next";
import { Providers } from "@/components/context/Providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Phoenix"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
