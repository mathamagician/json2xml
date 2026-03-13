import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — JSON2XML",
  description: "Privacy policy for json2xml.com — how we handle your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 text-sm text-slate-400 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">Privacy Policy</h1>
          <p className="text-slate-500 text-xs">Effective date: March 8, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-slate-200 font-semibold text-base">Overview</h2>
          <p className="leading-relaxed">
            json2xml.com is a free, browser-based tool for converting between JSON and XML. We take
            privacy seriously. The conversion itself happens entirely on your device — your data is
            never transmitted to our servers or any third party.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-slate-200 font-semibold text-base">Data You Convert</h2>
          <p className="leading-relaxed">
            All JSON and XML conversion is performed locally in your browser using JavaScript. No
            input or output data is sent to any server. It is safe to use this tool with sensitive,
            confidential, or proprietary data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-slate-200 font-semibold text-base">Analytics</h2>
          <p className="leading-relaxed">
            We use Vercel Analytics to collect anonymized, aggregate data about site usage (page
            views, referrers, device types). This data does not include personally identifiable
            information and does not use cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-slate-200 font-semibold text-base">Advertising and Cookies</h2>
          <p className="leading-relaxed">
            This site may display advertisements served by Google AdSense. Google uses cookies
            (including the DoubleClick cookie) to serve ads based on your prior visits to this site
            and other sites on the internet. You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline"
            >
              Google Ads Settings
            </a>
            . You can also opt out via the{" "}
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline"
            >
              Network Advertising Initiative opt-out page
            </a>
            .
          </p>
          <p className="leading-relaxed">
            For more information on how Google uses data from sites that use its advertising
            services, visit{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline"
            >
              How Google uses information from sites or apps that use our services
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-slate-200 font-semibold text-base">Third-Party Links</h2>
          <p className="leading-relaxed">
            This site contains links to third-party websites (including Buy Me a Coffee). We are not
            responsible for the privacy practices of those sites and encourage you to review their
            privacy policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-slate-200 font-semibold text-base">Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this privacy policy from time to time. Changes will be reflected by the
            updated effective date at the top of this page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-slate-200 font-semibold text-base">Contact</h2>
          <p className="leading-relaxed">
            Questions about this privacy policy can be sent to{" "}
            <a
              href="mailto:Eddie.Bradford@gmail.com"
              className="text-brand-400 hover:underline"
            >
              Eddie.Bradford@gmail.com
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
