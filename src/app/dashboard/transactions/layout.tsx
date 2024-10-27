import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions - Shinobi Alliance"
};

export default function TransactionsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
