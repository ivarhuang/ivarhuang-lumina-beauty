import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMINA BEAUTY",
  description:
    "Advanced beauty technology for personalized skincare experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}