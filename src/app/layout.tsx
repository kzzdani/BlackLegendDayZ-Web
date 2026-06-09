import type { Metadata, Viewport } from "next";
import { Saira_Condensed, Chakra_Petch, Saira_Stencil_One } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.fullName} — Renace de las cenizas`,
    template: `%s · ${site.fullName}`,
  },
  description: site.shortPitch,
  keywords: [
    "DayZ",
    "servidor DayZ",
    "Black Legend",
    "DayZ español",
    "DayZ Livonia",
    "servidor DayZ PvP",
    "Vanilla 1PP",
    "survival",
  ],
  openGraph: {
    title: `${site.fullName} — Renace de las cenizas`,
    description: site.shortPitch,
    url: `https://${site.domain}`,
    siteName: site.fullName,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/brand/0logosoloBlackLegendNuevo.png",
        width: 1099,
        height: 1099,
        alt: site.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — Renace de las cenizas`,
    description: site.shortPitch,
    images: ["/brand/0logosoloBlackLegendNuevo.png"],
  },
  icons: { icon: "/brand/0logosoloBlackLegendNuevo2.png" },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${saira.variable} ${chakra.variable} ${stencil.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void text-bone">
        <SmoothScroll>
          <GrainOverlay />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
