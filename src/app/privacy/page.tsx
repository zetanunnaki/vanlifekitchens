import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "VanLifeKitchen.com privacy policy: what we collect, how we use it, third-party cookies from affiliate programs, and your rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container-narrow">
        <span className="eyebrow mb-6">Legal</span>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-earth-950 mt-4 mb-10 leading-tight text-balance">
          Privacy Policy
        </h1>

        <p className="text-sm text-earth-500 mb-10 italic">
          Last updated: April 15, 2026
        </p>

        <div className="prose-editorial space-y-6">
          <p className="text-lg leading-[1.85] text-earth-800">
            VanLifeKitchen.com (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects
            your privacy. This page explains what information we collect, how we use it, what
            third parties have access to it, and your rights as a visitor.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Information we collect
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            We collect minimal personal information directly. Specifically:
          </p>

          <ul className="list-none pl-0 space-y-3 text-lg leading-[1.75] text-earth-800">
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Anonymous analytics data</strong> — page views, referring URLs, browser
              type, device type, and approximate geographic region (country / state level). We
              do not collect IP addresses in a personally identifiable way.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Email address</strong> — only if you contact us directly via email at
              hello@vanlifekitchens.com. We do not run a newsletter or marketing list.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Affiliate click data</strong> — when you click an Amazon or Walmart
              affiliate link, the destination retailer collects standard click and conversion
              tracking data per their own privacy policies (linked below).
            </li>
          </ul>

          <p className="text-lg leading-[1.85] text-earth-800">
            We do <strong>not</strong> collect: your name, postal address, phone number,
            payment information, account credentials, or any other personally identifiable
            information through normal browsing of this site.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Cookies
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            We use the following categories of cookies:
          </p>

          <ul className="list-none pl-0 space-y-3 text-lg leading-[1.75] text-earth-800">
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Strictly necessary cookies</strong> — required for the site to function
              (for example, remembering your dark/light preference). These cannot be disabled.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Analytics cookies</strong> — anonymous, aggregated traffic measurement
              via privacy-respecting analytics. No cross-site tracking.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Affiliate program cookies</strong> — when you click an Amazon or Walmart
              affiliate link on this site, those retailers set their own cookies on your
              device. These cookies are required for the affiliate program to attribute the
              purchase to us and pay our commission. We do not control these cookies and do not
              have access to their contents.
            </li>
          </ul>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Third-party services
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            We use the following third-party services, each with their own privacy policies:
          </p>

          <ul className="list-none pl-0 space-y-3 text-lg leading-[1.75] text-earth-800">
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Amazon Associates Program</strong> — for product affiliate links. See{" "}
              <a
                href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
              >
                Amazon&apos;s Privacy Notice
              </a>
              .
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Walmart Affiliate Program</strong> — for product affiliate links. See{" "}
              <a
                href="https://corporate.walmart.com/privacy-security/walmart-privacy-notice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
              >
                Walmart&apos;s Privacy Notice
              </a>
              .
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              <strong>Vercel</strong> — our hosting provider. They may collect server logs
              (IP addresses, request times) for security and performance purposes. See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
              >
                Vercel&apos;s Privacy Policy
              </a>
              .
            </li>
          </ul>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Children&apos;s privacy
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            VanLifeKitchen.com is not directed at children under 13. We do not knowingly
            collect personally identifiable information from children under 13. If you believe
            we have collected such information, please contact us so we can delete it.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Your rights
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            Depending on your jurisdiction, you may have the following rights:
          </p>

          <ul className="list-none pl-0 space-y-3 text-lg leading-[1.75] text-earth-800">
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              The right to request access to any personal data we hold about you.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              The right to request deletion of your personal data.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              The right to object to processing of your personal data.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              The right to opt out of analytics tracking via standard browser
              &ldquo;Do Not Track&rdquo; signals, which we honor.
            </li>
          </ul>

          <p className="text-lg leading-[1.85] text-earth-800">
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:hello@vanlifekitchens.com"
              className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
            >
              hello@vanlifekitchens.com
            </a>
            .
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Changes to this policy
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo;
            date at the top of this page reflects the most recent revision. Material changes
            will be highlighted in the site footer for 30 days.
          </p>
        </div>
      </div>
    </section>
  );
}
