import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Review - Shinobi Alliance"
};

export default function OverviewLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
