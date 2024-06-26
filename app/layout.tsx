import "./globals.css";
import type { Metadata } from "next";
import { pretendard } from "./font";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "웹사이트 접속 상태 모니터링",
  description:
    "대한민국에서 사용하는 주요 웹사이트 50개의 서버 상태를 제공합니다. Made By CUZIAM(Full Stack Developer)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={pretendard.variable}>
      <body className="font-pretendard">
        <header>
          <NavBar />
        </header>
        <main className="mx-8 md:mx-24"> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
