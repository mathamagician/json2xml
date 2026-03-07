import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSON2XML — Free JSON ↔ XML Converter",
  description:
    "Convert JSON to XML or XML to JSON instantly in your browser. No uploads, no servers — your data stays on your machine.",
  keywords: ["json to xml", "xml to json", "json converter", "xml converter", "free online converter"],
  openGraph: {
    title: "JSON2XML — Free JSON ↔ XML Converter",
    description: "Convert JSON to XML or XML to JSON instantly in your browser. Your data never leaves your machine.",
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
