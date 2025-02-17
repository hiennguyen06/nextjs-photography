import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photos | Hien Nguyen",
  description:
    "A collection of photos captured on film and digital by Hien Nguyen",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inconsolata.variable}  antialiased`}>
        {children}
        {modal}
      </body>
    </html>
  );
}
