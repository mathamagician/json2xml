import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSON2XML — Free JSON ↔ XML Converter Online",
  description:
    "Convert JSON to XML or XML to JSON instantly in your browser. Free, private, no sign-up. No uploads, no servers — your data stays on your machine.",
  keywords: [
    "json to xml",
    "xml to json",
    "json to xml converter",
    "xml to json converter",
    "json to xml online",
    "convert json to xml",
    "convert xml to json",
    "free json converter",
    "free xml converter",
    "json xml tool",
    "online xml converter",
    "json xml online free",
  ],
  alternates: {
    canonical: "https://json2xml.com",
  },
  openGraph: {
    title: "JSON2XML — Free JSON ↔ XML Converter Online",
    description: "Convert JSON to XML or XML to JSON instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com",
    siteName: "JSON2XML",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
