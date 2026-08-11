import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sedhiis — Trade smarter",
  description: "Sedhiis — your gateway to India's financial markets. Web access and admin panel.",
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
