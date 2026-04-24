import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajmera Exchange",
  description: "Ajmera Exchange — web access and admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
