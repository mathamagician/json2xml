import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://json2xml.com"),
  title: "JSON2XML — Free JSON ↔ XML Converter Online",
  description:
    "Convert JSON to XML or XML to JSON instantly in your browser. Handles files up to 20 GB (Chrome/Edge) or 5 GB (other browsers). Free, private, no sign-up — your data stays on your machine.",
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
      <head>
        {/* Google Analytics */}
        <script async={true} src="https://www.googletagmanager.com/gtag/js?id=G-GSY3ECW9VC" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GSY3ECW9VC');`,
          }}
        />
        {/* Google Translate */}
        <script
          dangerouslySetInnerHTML={{
            __html: `function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
    'google_translate_element'
  );
}`,
          }}
        />
        <script async={true} src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
        {/* Google AdSense */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async={true}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5085230476314931"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
