import "./globals.css";
// import "./bounce-bottom.css";
import { Inter } from "next/font/google";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "S.T. Portfolio",
  description: "A fresh grad seeking opportunities to work",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
