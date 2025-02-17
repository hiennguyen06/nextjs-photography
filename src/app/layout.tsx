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

  icons: {
    // Classic favicon
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/icon.png", type: "image/png", sizes: "192x192" },
    ],
    // Apple touch icon
    apple: [
      { url: "/favicon/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    // Other icons
    shortcut: ["/favicon/favicon.ico"],
  },
  manifest: "/manifest.json", // Optional: for PWA support
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
