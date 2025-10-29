import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cá Khô Đặc Sản",
  description: "Hệ thống quản lý sản phẩm cá khô chất lượng cao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
