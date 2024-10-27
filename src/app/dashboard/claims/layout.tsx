import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Claims - Shinobi Alliance"
};

export default function ClaimsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
