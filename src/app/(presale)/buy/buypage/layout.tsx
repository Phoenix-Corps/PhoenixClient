import "@/app/(presale)/buy/buypage/styles/global.css";
import Header from "@/app/(presale)/buy/buypage/components/header";
import "@/app/(presale)/buy/buypage/styles/global.css";
import Footer from "@/app/(presale)/buy/buypage/components/footer";
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* TODO: maybe put theme wrapper on home page */}

      <div className="min-h-screen background-image text-white">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
