import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cá Khô Đặc Sản",
  description: "Hệ thống quản lý sản phẩm cá khô chất lượng cao - Cá tươi sấy khô tự nhiên, đảm bảo vệ sinh an toàn thực phẩm",
  keywords: "cá khô, cá khô đặc sản, thực phẩm khô, cá sấy khô",
  authors: [{ name: "Cá Khô Đặc Sản" }],
  openGraph: {
    title: "Cá Khô Đặc Sản",
    description: "Cá tươi sấy khô tự nhiên, đảm bảo chất lượng",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-lg z-50">
          Bỏ qua đến nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
