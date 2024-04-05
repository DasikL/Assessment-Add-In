import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Button Generator",
  description: "Assessment-Button-Generator",
  keywords: ["Button", "Generator"],
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
