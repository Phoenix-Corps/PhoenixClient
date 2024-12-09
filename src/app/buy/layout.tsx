import "@/app/buy/styles/globals.css";
import "@/app/buy/styles/global.css";
import Header from "@/app/buy/components/header";
import Footer from "@/app/buy/components/footer/Footer";
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* TODO: maybe put theme wrapper on home page */}

      <div className="min-h-screen main-air-wrapper text-white">
        <Header />
        {children}
      </div>
    </div>
  );
}
