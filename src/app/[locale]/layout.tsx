import type { Viewport } from "next";
import { Saira_Condensed, Chakra_Petch, Saira_Stencil_One } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LiveStatusProvider } from "@/components/LiveStatus";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Intro } from "@/components/Intro";
import { FloatingDiscord } from "@/components/FloatingDiscord";
import { Lightbox } from "@/components/Lightbox";
import { Konami } from "@/components/Konami";

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const stencil = Saira_Stencil_One({
  variable: "--font-stencil",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(`https://${site.domain}`),
    title: {
      default: `${site.fullName} — ${t("titleSuffix")}`,
      template: `%s · ${site.fullName}`,
    },
    description: t("description"),
    keywords: t("keywords").split(","),
    openGraph: {
      title: `${site.fullName} — ${t("titleSuffix")}`,
      description: t("description"),
      url: `https://${site.domain}`,
      siteName: site.fullName,
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${site.fullName} — ${t("titleSuffix")}`,
      description: t("description"),
    },
    icons: { icon: "/brand/0logosoloBlackLegendNuevo2.png" },
    alternates: {
      languages: { es: "/", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <html
      lang={locale}
      className={`${saira.variable} ${chakra.variable} ${stencil.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void text-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: site.fullName,
                  url: `https://${site.domain}`,
                  logo: `https://${site.domain}/brand/0logosoloBlackLegendNuevo.png`,
                  description: t("description"),
                  sameAs: [site.social.discord, site.social.youtube],
                },
                {
                  "@type": "WebSite",
                  name: site.fullName,
                  url: `https://${site.domain}`,
                  inLanguage: locale === "en" ? "en-US" : "es-ES",
                },
              ],
            }),
          }}
        />
        <NextIntlClientProvider>
          <Intro />
          <ScrollProgress />
          <Lightbox />
          <Konami />
          <SmoothScroll>
            <LiveStatusProvider>
              <GrainOverlay />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <FloatingDiscord />
            </LiveStatusProvider>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
