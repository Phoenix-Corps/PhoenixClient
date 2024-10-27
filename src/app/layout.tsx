import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

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
      <body className={noto_serif.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
